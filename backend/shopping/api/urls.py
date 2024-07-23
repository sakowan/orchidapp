from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet

country_router =  DefaultRouter()
country_router.register('countries', CountryViewSet )