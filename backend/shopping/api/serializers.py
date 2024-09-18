#  Converts django models in JSON format for React use
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from ..models import Country, Product, Category, BamUser, CartProduct, Review, Order, OrderProduct, Address, Complaint

class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = ('id',  'name', 'country_code', 'currency_code', 'calling_code')

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ComplaintSerializer(ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class ProductInfoSerializerMixin(serializers.Serializer):
    product_info = serializers.SerializerMethodField()

    def get_product_info(self, obj):
        product = obj.product
        return {
            'name': product.name,
            'price': product.price,
            'main_img': product.main_img,
            'url_name': product.url_name
        }

class CartProductSerializer(ProductInfoSerializerMixin, ModelSerializer):
    class Meta:
        model = CartProduct
        fields = '__all__'

class OrderProductSerializer(ProductInfoSerializerMixin, ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    order_products = OrderProductSerializer(many=True)
    address = AddressSerializer()

    class Meta:
        model = Order
        fields = ['id', 'status', 'created_at', 'updated_at', 'address', 'num_products', 'shipping_fee', 'shipping_type', 'subtotal', 'total', 'order_products']

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