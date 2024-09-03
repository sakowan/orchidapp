import stripe, json
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.db.models import Avg, Sum
from django.conf import settings
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
stripe.api_key = settings.STRIPE_SECRET_KEY

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, generics

from ..models import Country, Product, Category, BamUser, CartProduct, Review
from .serializers import CountrySerializer, ProductSerializer, CategorySerializer, UserSerializer, CartProductSerializer, ReviewSerializer

######### CSRF #########
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = ([permissions.AllowAny])
    
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set.'})
######### ENDCSRF #########

######### STRIPE #########
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)

@api_view(['POST'])
@csrf_protect
def save_stripe_info(request):
    return Response({'success': 'accessed csrf protected view: save_stripe_info'})

    # data = request.data
    # email = data['email']
    # payment_method_id = data['payment_method_id']
    
    # # creating customer
    # customer = stripe.Customer.create(email=email, payment_method=payment_method_id)
     
    # return Response(status=status.HTTP_200_OK, data={
    #     'message': 'Success', 
    #     'data': {'customer_id': customer.id}   
    # }) 
######### END STRIPE #########

class CreateUserView(generics.CreateAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class GetUserView(generics.RetrieveAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer

class CartProductViewSet(ModelViewSet):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    # permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        cart_id = request.data.get('cart_id')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        cp = CartProduct.objects.filter(cart_id=cart_id, product_id=product_id).first()

        # If cp already exists
        if (cp):
            cp.quantity = quantity
            cp.save()
            return Response('CartProduct updated', status=status.HTTP_200_OK)

        else:
            cp = CartProduct(cart_id=cart_id, product_id=product_id, quantity=quantity)
            cp.user = request.user
            cp.save()
            return Response('CartProduct created', status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = request.user.cart_products.all()
        if not queryset:
            return Response()
        
        num_items = queryset.aggregate(total=Sum('quantity'))['total']
        cart_products = CartProductSerializer(queryset, many=True).data
        data = {
            'cart_products': cart_products,
            'num_items': num_items
        }
        return Response(data)

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

class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        product_id = request.query_params.get('product_id')
        queryset = Review.objects.filter(product_id = product_id)
        serializer = self.get_serializer(queryset, many=True)

        #Add average rating
        avg_rating = queryset.aggregate(avg_rating=Avg('rating'))['avg_rating']
        avg_rating = format(round(avg_rating, 1), ".1f")
        
        #Handle the case where there are no reviews
        if avg_rating is None:
            avg_rating = 0.0
        
        #Prepare the response data
        response_data = {
            'reviews': serializer.data,
            'avg_rating': avg_rating
        }
    
        # Return the response with appended average rating
        return Response(response_data)

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
        except Exception as e:
            return HttpResponse(e) 
        return
        # return redirect(checkout_session.url, code=303)