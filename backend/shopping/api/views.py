from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from ..models import Country, ProductListing, Category, BamUser
from .serializers import CountrySerializer, ProductListingSerializer, CategorySerializer, BamUserSerializer

class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class ProductListingViewSet(ModelViewSet):
    queryset = ProductListing.objects.all()
    serializer_class = ProductListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BamUserViewSet(ModelViewSet):
    queryset = BamUser.objects.all()
    serializer_class = BamUserSerializer

class LoginAPIView(APIView):
    def get(self, request):
        # Handle GET request
        return Response({'message': 'GET request for Login endpoint'}, status=status.HTTP_200_OK)

class CheckoutAPIView(APIView):
    def get(self, request):
        # Handle GET request
        return Response({'message': 'GET request for Checkout endpoint'}, status=status.HTTP_200_OK)