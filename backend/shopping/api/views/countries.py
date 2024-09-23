from ...models import Country
from rest_framework.viewsets import ModelViewSet
from ..serializers import CountrySerializer

class CountryViewSet(ModelViewSet):
  queryset = Country.objects.all()
  serializer_class = CountrySerializer