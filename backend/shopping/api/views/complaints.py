from ...models import Complaint, ComplaintOrderProduct, Order, OrderProduct, ComplaintOPImage
from rest_framework.viewsets import ModelViewSet
from ..serializers import ComplaintSerializer
from rest_framework import permissions
import json
import re

class ComplaintViewSet(ModelViewSet):
  STATUSES = {
    'unassigned': 0,
    'in_progress': 1,
    'resolved': 2
  }
  
  queryset = Complaint.objects.all()
  serializer_class = ComplaintSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def create_cop(complaint, data):
    for key in data.keys():
      if(key.startswith('order_product_')):
        op_id = key.split('_')[-1]
        order_product = OrderProduct.objects.get(id=op_id)


        cop = ComplaintOrderProduct(
          complaint = complaint,
          order_product = order_product,
          title = data.get(f'title_{op_id}', ''),
          body = data.get(f'body_{op_id}', ''),
          quantity = data.get(f'quantity_{op_id}', 0),
        )
        cop.save()

        # Create the ComplaintOPImage
  
  def create(self, request, *args, **kwargs):
    rawdata = request.data
    # details = json.loads(rawdata['details'])
    details = rawdata.pop('details', None)
    details = json.loads(details[0])
    order_id = details.pop('order_id', None)
    order = Order.objects.get(id=order_id)
    print('************************************************************************************************************')
    print('************************************************************************************************************')
    
    # Create the main complaint
    complaint = Complaint(
      user = request.user,
      order = order,
      status = self.__class__.STATUSES['unassigned'],
      resolved = False
    )
    complaint.save()

    # Initialise the complaints made on each order_product
    for key in details:
      values = details[key]
      order_product = OrderProduct.objects.get(id=values['order_product'])
      cop = ComplaintOrderProduct(
        complaint = complaint,
        order_product = order_product,
        title = values['title'],
        body = values['body'],
        quantity = values['quantity'],
      )
      cop.save()
    
    # Handle the images
    imgIDpattern = r'imgFiles(\d+)\[\]'
    for imgKey in rawdata:
      
      #Strip the digits (order_product_id) from the key imgFilesXXX[]
      match = re.search(imgIDpattern, imgKey)
      if match:
        op_id = match.group(1)
        for img in request.FILES.getlist(imgKey):
          print(type(img))
          cop_img = ComplaintOPImage.objects.create(
            complaint_order_product = cop,
            image = img
          )
        print('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        print('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    
