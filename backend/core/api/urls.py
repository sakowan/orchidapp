from rest_framework.routers import DefaultRouter
from shopping.api.urls import country_router, product_listing_router, category_router, user_router
from shopping.api.views import LoginAPIView, CheckoutAPIView, get_csrf_token
from django.urls import path, include 

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
    path('login/', LoginAPIView.as_view(), name='login'),
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
    path('csrf-token/', get_csrf_token, name='csrf_token'),

]