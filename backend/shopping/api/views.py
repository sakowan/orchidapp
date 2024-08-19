import stripe, json
from django.conf import settings
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
stripe.api_key = settings.STRIPE_SECRET_KEY

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status, generics

from ..models import Country, ProductListing, Category, BamUser
from .serializers import CountrySerializer, ProductListingSerializer, CategorySerializer, UserSerializer

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

class GetProductView(generics.RetrieveAPIView):
    queryset = ProductListing.objects.all()
    serializer_class = ProductListingSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'url_name'
    
    def get_object(self):
        print("dsdsfdsafdfsadsfadsfadsafdfsadsafdsfdasfdsafdasfdsfa")
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

# class UserRegister(APIView):
#     #Who is allowed to access this class
#     permission_classes = (permissions.AllowAny,)
    
#     def post(self, request):
#         #Clean data before passing to serializer by using any validator on the fields first then:
#         clean_data = request.data
#         serializer = UserRegisterSerializer(data=clean_data)
#         if serializer.is_valid(raise_exception=True):

#             #User created and returned by serializer function
#             user = serializer.create(clean_data)
#             if user:
#                 return Response(serializer.data, status = status.HTTP_201_CREATED)
#         return Response(status = status.HTTP_400_BAD_REQUEST)

# class UserLogin(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication,)

#     def post(self, request):
#         data = request.data
#         # assert validate_email(data)
#         # assert validate_password(data)
#         serializer = UserLoginSerializer(data=data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.check_user(data)
#             login(request, user)
#             return Response(serializer.data, status = status.HTTP_200_OK)

# class UserLogout(APIView):
#     def post(self, request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

# class UserView(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     authentication_classes = (SessionAuthentication,)

#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         print(request.COOKIES)
#         return Response({'user': serializer.data}, status=status.HTTP_200_OK)