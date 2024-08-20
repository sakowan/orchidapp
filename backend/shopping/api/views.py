import stripe, json
from django.conf import settings
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
stripe.api_key = settings.STRIPE_SECRET_KEY

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, generics

from ..models import Country, ProductListing, Category, BamUser, CartProductListing
from .serializers import CountrySerializer, ProductListingSerializer, CategorySerializer, UserSerializer, CartProductListingSerializer

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class CreateUserView(generics.CreateAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class GetUserView(generics.RetrieveAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer

class CartProductListingViewSet(ModelViewSet):
    queryset = CartProductListing.objects.all()
    serializer_class = CartProductListingSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def list(self, request):
        user = BamUser.objects.get(email=request.user)
        cart = user.cart
        queryset = CartProductListing.objects.filter(cart_id = cart.id)
        if not queryset:
            return Response()
        
        serializer = CartProductListingSerializer(queryset)
        return Response(serializer.data)

class GetProductView(generics.RetrieveAPIView):
    queryset = ProductListing.objects.all()
    serializer_class = ProductListingSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'url_name'
    
    def get_object(self):
        # Get url name from the url on browser
        url_name = self.kwargs.get('url_name')

        # Get and return the product instance based on `url_name`
        return generics.get_object_or_404(ProductListing, url_name=url_name)

class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class ProductListingViewSet(ModelViewSet):
    queryset = ProductListing.objects.all()
    serializer_class = ProductListingSerializer
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
        return generics.get_object_or_404(ProductListing, url_name=url_name)
    
    def list(self, request, *args, **kwargs):
        queryset = self.queryset
        serializer = ProductListingSerializer(queryset, many=True)
        self.permission_classes = [permissions.AllowAny]
        
        return Response(serializer.data)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
 
class CheckoutAPIView(APIView):
    def get(self, request):
        csrf_token = get_token(request)
        return Response({'csrfToken': csrf_token}, status=status.HTTP_200_OK)
    
    # @requires_csrf_token
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        print(request.user)

        try:
            return
            # Create a new dictionary with only the specified keys
            # address_keys = ['post_code', 'prefecture', 'city', 'street', 'building_name', 'recipient_name', 'recipient_phone']
            # address_data = {key: data[key] for key in address_keys if key in data}
            # address = Address.objects.create(**address_data)
            # address.save()
            # print(address)
            # checkout_session = stripe.checkout.Session.create(
            #     line_items=[
            #         {
            #             # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            #             'price': '{{PRICE_ID}}',
            #             'quantity': 1,
            #         },
            #     ],
            #     mode='payment',
            #     success_url=settings.FRONTEND_URL + '?success=true',
            #     cancel_url=settings.FRONTEND_URL + '?canceled=true',
            # )
        except Exception as e:
            return HttpResponse(e) 
        return
        # return redirect(checkout_session.url, code=303)