#  Converts django models in JSON format for React use
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model, authenticate
from ..models import Country, Product, Category, BamUser, CartProduct, Review

class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ('id',  'name', 'country_code', 'currency_code', 'calling_code')

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CartProductSerializer(ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class UserSerializer(ModelSerializer):
    cart_products = CartProductSerializer(many=True)
    cart_id = serializers.PrimaryKeyRelatedField(source='cart', read_only=True)
    
    class Meta:
        model = BamUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'cart_id', 'cart_products']
        extra_kwargs = {'password': {'write_only': True}} #Accept pw when creating a user but not when returning a user for safety.

    def create(self, validated_data):
        user = BamUser.objects.create_user(**validated_data)
        return user