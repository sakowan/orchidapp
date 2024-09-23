from ...models import Category
from rest_framework.viewsets import ModelViewSet
from ..serializers import CategorySerializer
from rest_framework import permissions

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]