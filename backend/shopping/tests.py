from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import BamUser
from rest_framework import status


# class AccountsTest(APITestCase):
#     def setUp(self):
#         # We want to go ahead and originally create a BamUser 
#         self.test_user = BamUser.objects.create_user('test@example.com', 'testpassword')

#         # URL for creating an account.
#         self.create_url = reverse('account-create')

#     def test_create_user(self):
#         """
#         Ensure we can create a new user and a valid token is created with it.
#         """
#         data = {
#             'email': 'foobar@example.com',
#             'password': 'somepassword'
#         }

#         response = self.client.post(self.create_url , data, format='json')

#         # We want to make sure we have two users in the database..
#         self.assertEqual(BamUser.objects.count(), 2)
#         # And that we're returning a 201 created code.
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # Additionally, we want to return email upon successful creation.
#         self.assertEqual(response.data['email'], data['email'])
#         self.assertFalse('password' in response.data)

# Create your tests here.
