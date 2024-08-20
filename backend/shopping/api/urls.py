from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, ProductListingViewSet, CategoryViewSet, CartProductListingViewSet, ReviewViewSet

country_router =  DefaultRouter() # Generates URL patterns for my viewset, REST API endpoints
country_router.register(r'countries', CountryViewSet ) # All will start with 'countries/', and the ViewSet that will handle requests to these URLs

product_listing_router =  DefaultRouter()
product_listing_router.register(r'product_listings', ProductListingViewSet )

category_router =  DefaultRouter()
category_router.register(r'categories', CategoryViewSet )

cart_product_listing_router =  DefaultRouter()
cart_product_listing_router.register(r'cart_products', CartProductListingViewSet )

review_router = DefaultRouter()
review_router.register(r'reviews', ReviewViewSet)

# user_router =  DefaultRouter()
# user_router.register(r'users', BamUserViewSet )