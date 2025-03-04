from shopping.api.views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shopping.api.urls import country_router, product_router, category_router, cart_product_router, review_router, order_router, complaint_router
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView #Prebuilt views that let me access and refresh tokens

router = DefaultRouter()

# FROM /shopping/api/urls.py
# URL: countries/
router.registry.extend(country_router.registry)

# URL: products/
router.registry.extend(product_router.registry)

# URL: categories/
router.registry.extend(category_router.registry)

# URL: cart_products/
router.registry.extend(cart_product_router.registry)

# URL: reviews/
router.registry.extend(review_router.registry)

# URL: orders/
router.registry.extend(order_router.registry)

# URL: complaints/
router.registry.extend(complaint_router.registry)

# URL: users/
# router.registry.extend(user_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    
    path("user/register/", CreateUserView.as_view(), name='register'),
    path("user/<int:pk>/", GetUserView.as_view(), name='get-user'),

    path("token/", TokenObtainPairView.as_view(), name='get-token'),
    path("token/refresh/", TokenRefreshView.as_view(), name='refresh'),

    path('save-stripe-info/', save_stripe_info, name='save_stripe_info'),
    path('products/bestsellers/', ProductViewSet.as_view({'get': 'bestsellers'})),
    path('products/<str:url_name>', GetProductView.as_view()),

    path('csrf-cookie', GetCSRFToken.as_view()),
    path('cart_products/<int:pid>/', CartProductViewSet.as_view({'get': 'retrieve'})),

    path('test-send-email/', test_send_email, name='test_send_email'),
]