from ...models import Complaint
from rest_framework.viewsets import ModelViewSet
from ..serializers import ComplaintSerializer
from rest_framework import permissions

class ComplaintViewSet(ModelViewSet):
  queryset = Complaint.objects.all()
  serializer_class = ComplaintSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
  
  def create(self, request, *args, **kwargs):
    print('HITHITHITHITHITHITHITHITHITHITHITHITHITHITHITHIT')
    print(request.data)
    print('HITHITHITHITHITHITHITHITHITHITHITHITHITHITHITHIT')
