from django.db.models import Sum
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions, status

from ...models import BamUser, CartProduct
from ..serializers import CartProductSerializer

class CartProductViewSet(ModelViewSet):
  queryset = CartProduct.objects.all()
  serializer_class = CartProductSerializer
  # permission_classes = (permissions.IsAuthenticated,)

  def create(self, request, *args, **kwargs):
    cart_id = request.data.get('cart_id')
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity')
    cp = CartProduct.objects.filter(cart_id=cart_id, product_id=product_id).first()
    user = BamUser.objects.get(email=request.user)
    
    # If cp already exists
    if (cp):
      cp.quantity = quantity
      cp.save()
      cart_products = CartProduct.objects.filter(user_id = user.id)
      num_items = cart_products.aggregate(total=Sum('quantity'))['total']
      return Response({'message': 'CartProduct updated', "cart_products": CartProductSerializer(cart_products, many=True).data, "num_items": num_items}, status=status.HTTP_200_OK)

    else:
      cp = CartProduct(cart_id=cart_id, product_id=product_id, quantity=quantity)
      cp.user = request.user
      cp.save()
      cart_products = CartProduct.objects.filter(user_id = user.id)
      num_items = cart_products.aggregate(total=Sum('quantity'))['total']
      return Response({'message': 'CartProduct created', "cart_products": CartProductSerializer(cart_products, many=True).data, "num_items": num_items}, status=status.HTTP_201_CREATED)

  def list(self, request):
    queryset = request.user.cart_products.all().order_by('created_at')
    if not queryset:
      return Response()
    
    num_items = queryset.aggregate(total=Sum('quantity'))['total']
    cart_products = CartProductSerializer(queryset, many=True).data
    data = {
      'cart_products': cart_products,
      'num_items': num_items
    }
    return Response(data)
  
  def retrieve(self, request, pk):
    try:
      cart_product = request.user.cart_products.get(product_id=pk)
      return Response({'cart_product' : CartProductSerializer(cart_product).data})
    except ObjectDoesNotExist:
      return Response({"error": "Product doesn't exist in user cart"}, status=status.HTTP_404_NOT_FOUND)