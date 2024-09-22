import stripe
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_protect
from django.conf import settings
stripe.api_key = settings.STRIPE_SECRET_KEY
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet
from ..serializers import OrderSerializer

from rest_framework.response import Response
from rest_framework import status

from ...models import CartProduct, Order, Address, OrderProduct

@csrf_protect
@api_view(['POST'])
def save_stripe_info(request):
    user = request.user
    data = request.data
    email = data['email']
    cart_prods = data['cart_prods']
    payment_method_id = data['payment_method_id']
    extra_msg = ''
    
    # Check if stripe-customer already exists
    customer_data = stripe.Customer.list(email=email).data  

    if len(customer_data) == 0: # If stripe-customer doesn't exist
        # Create customer
        customer = stripe.Customer.create(
        email=email, payment_method=payment_method_id)
        extra_msg = 'New customer created.'
    else: # Get existing customer
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    # Make a payment
    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='jpy',
        amount=(data['subtotal'] + data['shipping_fee']),
        confirm=True,
        return_url='http://localhost:5173/orders')

    ########## CREATE NEW ORDER ##########
    # Save address for one-to-one relationship with order
    address = Address(
        user = user,
        first_name = data['first_name'],
        last_name = data['last_name'],
        country = data['country'],
        post_code = data['post_code'],
        prefecture = data['prefecture'],
        city = data['city'],
        street = data['street'],
        building = data['building'],
        contact = email
    )
    address.save()

    order = Order(
        user = user,
        email = email,
        address = address,
        num_products = data['num_cart_prods'],
        payment_method_id = data['payment_method_id'],
        shipping_type = data['shipping_type'],
        shipping_fee = data['shipping_fee'],
        subtotal = data['subtotal'],
        total = data['subtotal'] + data['shipping_fee'],
        status = 1 # Paid
    )
    order.save()

    # Transfer cart_products to order_products then delete the cart_products that were just ordered.
    for obj in cart_prods:
        try:
            cart_product = CartProduct.objects.get(id=obj['id'])
            order_product = OrderProduct(
                order = order,
                user = user,
                quantity = cart_product.quantity,
                product = cart_product.product,
            )
            order_product.save()
            cart_product.delete()
        except CartProduct.DoesNotExist:
            print(f"Cart product {obj['id']} not found.")
    ########## END CREATE NEW ORDER ##########

    return Response(status=status.HTTP_200_OK, 
        data={'message': 'Success', 'data': {
        'customer_id': customer.id, 'extra_msg': extra_msg}
    })

class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        queryset = request.user.orders.all().order_by('-created_at')
        orders = OrderSerializer(queryset, many=True).data
        return Response(orders)