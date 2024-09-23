from ...models import Product
from ..serializers import ProductSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, generics
from rest_framework.response import Response

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'url_name'

    def get_permissions(self):
        if (self.action == 'list') or (self.action == 'retrieve'):
            # Allow anyone to view product listings
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_view(self): #I can name this whatever I want
        # Get url name from the url in browser
        self.permission_classes = [permissions.AllowAny]
        url_name = self.kwargs.get('url_name')

        # Get and return the product instance based on `url_name`
        return generics.get_object_or_404(Product, url_name=url_name)
    
    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        serializer = ProductSerializer(queryset, many=True)
        self.permission_classes = [permissions.AllowAny]
        
        return Response(serializer.data)

class GetProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'url_name'
    
    def get_object(self):
        # Get url name from the url on browser
        url_name = self.kwargs.get('url_name')

        # Get and return the product instance based on `url_name`
        return generics.get_object_or_404(Product, url_name=url_name)