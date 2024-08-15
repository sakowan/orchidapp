from shopping.api.views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shopping.api.urls import country_router, product_listing_router, category_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #Prebuilt views that let me access and refresh tokens

router = DefaultRouter()

# FROM /shopping/api/urls.py
# URL: countries/
router.registry.extend(country_router.registry)

# URL: product_listings/
router.registry.extend(product_listing_router.registry)

# URL: categories/
router.registry.extend(category_router.registry)

# URL: users/
# router.registry.extend(user_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    
    path("user/register/", CreateUserView.as_view(), name='register'),
    path("user/<int:pk>/", GetUserView.as_view(), name='get-user'),

    path("token/", TokenObtainPairView.as_view(), name='get-token'),
    path("token/refresh/", TokenRefreshView.as_view(), name='refresh'),


    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
    # path('csrf-token/', get_csrf_token, name='csrf_token'),

]

# path('register', UserRegister.as_view(), name='register'),
# path('login', UserLogin.as_view(), name='login'),
# path('logout', UserLogout.as_view(), name='logout'),
# path('user', UserView.as_view(), name='user'),