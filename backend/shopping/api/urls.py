from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, ProductViewSet, CategoryViewSet, CartProductViewSet, ReviewViewSet, OrderViewSet, ComplaintViewSet

country_router =  DefaultRouter() # Generates URL patterns for my viewset, REST API endpoints
country_router.register(r'countries', CountryViewSet ) # All will start with 'countries/', and the ViewSet that will handle requests to these URLs

product_router =  DefaultRouter()
product_router.register(r'products', ProductViewSet )

category_router =  DefaultRouter()
category_router.register(r'categories', CategoryViewSet )

cart_product_router =  DefaultRouter()
cart_product_router.register(r'cart_products', CartProductViewSet )

review_router = DefaultRouter()
review_router.register(r'reviews', ReviewViewSet)

order_router = DefaultRouter()
order_router.register(r'orders', OrderViewSet)

complaint_router = DefaultRouter()
complaint_router.register(r'complaints', ComplaintViewSet)