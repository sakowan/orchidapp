from rest_framework.routers import DefaultRouter
from shopping.api.urls import country_router
from django.urls import path, include 

router = DefaultRouter()
router.registry.extend(country_router.registry)

urlpatterns = [
    path('', include(router.urls))
]