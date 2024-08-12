import stripe, json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status
from ..models import Country, ProductListing, Category, BamUser, Address, Order
from .serializers import CountrySerializer, ProductListingSerializer, CategorySerializer, BamUserSerializer
from .serializers import CountrySerializer, ProductListingSerializer, CategorySerializer, BamUserSerializer
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import requires_csrf_token
from django.contrib.auth import authenticate, login

stripe.api_key = settings.STRIPE_SECRET_KEY

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

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
class BamUserViewSet(ModelViewSet):
    queryset = BamUser.objects.all()
    serializer_class = BamUserSerializer
    
    def create(self, request, *args, **kwargs):
        # Serialize and validate the incoming data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
    def create(self, request, *args, **kwargs):
        # Serialize and validate the incoming data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
#         user = self.perform_create(serializer)
#         # user = authenticate(email=user.email, password=request.data['password'])
#         if user is not None:
#             login(request, user)
#             return Response({serializer.data}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({"error": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)

#     def perform_create(self, serializer):
#         # Custom logic
#         return serializer.save()

class UserRegister(APIView):
    #Who is allowed to access this class
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        #Clean data before passing to serializer by using any validator on the fields first then:
        clean_data = request.data
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):

            #User created and returned by serializer function
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(status = status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        # assert validate_email(data)
        # assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status = status.HTTP_200_OK)

class UserLogout(APIView):
    def post(self, request):
        print(get_csrf_token)
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        return Response({'message': 'GET request for Login endpoint'}, status=status.HTTP_200_OK)
        return Response({'message': 'GET request for Login endpoint'}, status=status.HTTP_200_OK)

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