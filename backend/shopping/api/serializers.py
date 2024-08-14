#  Converts django models in JSON format for React use
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model, authenticate
from ..models import Country, ProductListing, Category, BamUser
from django.forms import ValidationError

class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ('id',  'name', 'country_code', 'currency_code', 'calling_code')

class ProductListingSerializer(ModelSerializer):
    class Meta:
        model = ProductListing
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = BamUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}} #Accept pw when creating a user but not when returning a user for safety.

    def create(self, validated_data):
        user = BamUser.objects.create_user(**validated_data)
        print(user)
        return user
    
# class UserRegisterSerializer(ModelSerializer):
#     class Meta:
#         model =  BamUser
#         fields = '__all__'  

#     def create(self, clean_data):
#         user = BamUser.objects.create_user(
#             username = clean_data['email'], #username needed for auth
#             email = clean_data['email'],
#             password = clean_data['password'],
#             first_name = clean_data['first_name'],
#             last_name = clean_data['last_name'],
#             phone = clean_data['phone'],
#         )
#         user.save()
#         return user

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def check_user(self, clean_data):
#         user = authenticate(
#             email = clean_data['email'],
#             password = clean_data['password']
#         )
#         if not user:
#             raise ValidationError('User not found')
#         return user

# class UserSerializer(ModelSerializer):
#     class Meta:
#         model = BamUser
#         fields = ('email', 'first_name')

# class BamUserSerializer(ModelSerializer):
#     email = serializers.EmailField(
#             required=True,
#             validators=[UniqueValidator(queryset=BamUser.objects.all())]
#             )
#     password = serializers.CharField(min_length=8)

#     def create(self, validated_data):
#         user = BamUser.objects.create_user(validated_data['email'],
#              validated_data['password'])
#         return user
    
#     class Meta:
#         model = BamUser
#         fields = '__all__'