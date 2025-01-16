from django.conf import settings
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.views.decorators.csrf import csrf_protect

from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

@csrf_protect
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def test_send_email(request):
  print('##############################################################################')
  try:
    send_mail(f'Backend {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 'Testing 123', 'orchidapp.team@gmail.com', ['raegalib@gmail.com'])
    return Response({'message': 'Function: test_send_email'}, status=status.HTTP_200_OK)
  except:
    return Response({"message": f"Email didn't sent successfully"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)