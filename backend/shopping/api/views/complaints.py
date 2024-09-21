from ...models import Complaint, ComplaintOrderProduct, Order, OrderProduct, ComplaintOPImage
from rest_framework.viewsets import ModelViewSet
from ..serializers import ComplaintSerializer
from rest_framework import permissions, status
from rest_framework.response import Response

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
    
    # Handle the images
    imgIDpattern = r'imgFiles(\d+)\[\]'
    cop_imgs = []
    for imgKey in rawdata:
      #Strip the digits (order_product_id) from the key imgFilesXXX[]
      match = re.search(imgIDpattern, imgKey)
      if match:
        op_id = match.group(1)
        for img in request.FILES.getlist(imgKey):
          print(f"File Name: {img.name}")
          print(f"File Size: {img.size} bytes")
          print(f"Content Type: {img.content_type}")

          cop_img = ComplaintOPImage.objects.create(
            complaint_order_product = cop,
            image = img
          )
          cop_imgs.append(cop_imgs)
    
    return Response({
      'message': 'Complaint created successfully.', 'complaint': complaint.id}, status=status.HTTP_201_CREATED)
    
# HOW I DID S3 IMAGE UPLOADS BEFORE WITH A SPECIFIED PATH BUT IM NO LONGER USING THIS BUT I MIGHT WANNA KEEP IT FOR THE FUTURE <3
#   s3 = boto3.resource('s3')

#   # Define the folder path in the S3 bucket
#   folder = f'complaints/{complaint.id}/'
  
#   # Create a unique S3 key for the image
#   bucket_path = f'{folder}{img.name}'

#   # Upload the file to S3 directly from the InMemoryUploadedFile
#   s3.meta.client.upload_fileobj(
#       img.file,  # The file object to upload
#       'orchid-app-bucket',  # S3 bucket name
#       bucket_path  # Destination path in the bucket
#   )