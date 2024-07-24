from rest_framework.serializers import ModelSerializer
from ..models import Country, ProductListing, Category

#  Converts django models in JSON format for React use
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