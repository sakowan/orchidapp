from ...models import Complaint, ComplaintOrderProduct, Order, OrderProduct, ComplaintOPImage
from rest_framework.viewsets import ModelViewSet
from ..serializers import ComplaintSerializer
from rest_framework import permissions, status
from rest_framework.response import Response
from .HubspotClient import HubSpotClient

from django.core.exceptions import ObjectDoesNotExist

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

  def create_hubspot_ticket(self, user, order, complaint, subject, content):
    print('Function: complaints.py --- create_hubspot_ticket()')
    hs_client = HubSpotClient()
    hs_client.create_ticket(user, order, complaint, subject, content)

  def create_cop(complaint, data):
    print('Function: complaints.py --- create_cop()')
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
    print('************************************************************************************************************')
    print('************************************************************************************************************')
    print('Function: complaints.py --- create()')
    user = request.user
    rawdata = request.data
    details = rawdata.pop('details', None)
    details = json.loads(details[0])
    order_id = details.pop('order_id', None)
    print(rawdata)
    
    if user and details and order_id:
      try:
        print('Try 1: Get Order')
        order = Order.objects.get(id=order_id)  

        try:
          print('Try 2: Create Complaint')
          complaint = Complaint(
              user=user,
              order=order,
              status=self.__class__.STATUSES['unassigned'],
              resolved=False
          )
          complaint.save()

          try:
            print('Try 3: Create Complaint Order Products')
            cops = []
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
              cops.append(cop)
          
              try:
                print('Try 4: Upload Images for each COP')
                # Handle the images
                img_arr_key = f"imgFiles{order_product.id}[]"
                if rawdata[img_arr_key]:
                  for file in request.FILES.getlist(img_arr_key):
                    print(f"File Name: {file.name}")
                    print(f"File Size: {file.size} bytes")
                    print(f"Content Type: {file.content_type}")

                    # import pdb; pdb.set_trace()
                    ComplaintOPImage.objects.create(complaint_order_product = cop, image = file)

              except Exception as e:
                #Should delete halfway created COPS here.

                return Response(f"Error creating ComplaintOPImage: {e}", status=400)
                
            self.create_hubspot_ticket(user, order, complaint, "My subject", "My contents")
            return Response({'message': 'Complaint created successfully.', 'complaint': complaint.id}, status=status.HTTP_201_CREATED)
              
          except Exception as e:
            ComplaintOrderProduct.objects.filter(id__in=[instance.id for instance in cops]).delete()
            return Response(f"Error creating  and saving ComplaintOrderProduct: {e}", status=400)
        
        except Exception as e:
          return Response(f"Error creating Complaint: {e}", status=400)
      
      except:
        return Response({"message": f"Order with id: {order_id} not found."}, status=404)
    else:
      return Response({"message": f"Necessary data not provided / not found {json.loads({"user":user, "order_id": order_id, "details": details})}"}, status=404)