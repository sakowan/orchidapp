from ...models import Review
from ..serializers import ReviewSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.response import Response
from django.db.models import Avg

class ReviewViewSet(ModelViewSet):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  permission_classes = [permissions.AllowAny]

  def list(self, request, *args, **kwargs):
    product_id = request.query_params.get('product_id')
    queryset = Review.objects.filter(product_id = product_id)
    serializer = self.get_serializer(queryset, many=True)

    #Add average rating
    avg_rating = queryset.aggregate(avg_rating=Avg('rating'))['avg_rating']
    avg_rating = format(round(avg_rating, 1), ".1f")
    
    #Handle the case where there are no reviews
    if avg_rating is None:
        avg_rating = 0.0
    
    #Prepare the response data
    response_data = {
        'reviews': serializer.data,
        'avg_rating': avg_rating
    }

    # Return the response with appended average rating
    return Response(response_data)