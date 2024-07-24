from rest_framework.viewsets import ModelViewSet, permissions
from ..models import Country, ProductListing
from .serializers import CountrySerializer, ProductListingSerializer

class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class ProductListingViewSet(ModelViewSet):
    queryset = ProductListing.objects.all()
    serializer_class = ProductListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]