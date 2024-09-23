from ...models import BamUser
from ..serializers import UserSerializer
from rest_framework import permissions
from rest_framework import permissions, generics

class CreateUserView(generics.CreateAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class GetUserView(generics.RetrieveAPIView):
    queryset = BamUser.objects.all()
    serializer_class = UserSerializer