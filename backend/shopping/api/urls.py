from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, ProductListingViewSet # CRUD and custom methods etc.

country_router =  DefaultRouter() # Generates URL patterns for my viewset, REST API endpoints
country_router.register(r'countries', CountryViewSet ) # All will start with 'countries/', and the ViewSet that will handle requests to these URLs

product_listing_router =  DefaultRouter()
product_listing_router.register(r'product_listings', ProductListingViewSet )