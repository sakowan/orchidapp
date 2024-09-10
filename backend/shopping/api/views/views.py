from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions


######### CSRF #########
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = ([permissions.AllowAny])
    
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set.'})
######### ENDCSRF #########