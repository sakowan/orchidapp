from rest_framework.serializers import ModelSerializer
from ..models import Country

#  Converts django models in JSON format for React use
class CountrySerializer(ModelSerializer):
     
    class Meta:
        model = Country
        fields = ('id',  'name', 'country_code', 'currency_code', 'calling_code')