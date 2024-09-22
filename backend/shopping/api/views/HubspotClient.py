import requests
import json
from urllib.parse import quote_plus, urlencode
from django.conf import settings

class HubSpotClient():

  def __init__(self):
    self.hubspot_url = settings.HUBSPOT_API_URL
    self.base_url = f"{self.hubspot_url}/crm/v3/objects/"
    self.access_token = settings.HUBSPOT_API_KEY
    self.headers = {"authorization" : f"Bearer {self.access_token}"}
  
  def make_content(self, complaint):
    print("Function: make_content()")
    print(complaint)

    content = ""
    cops = complaint.complaint_order_products.all()
    for cop in cops:
      product = cop.order_product.product
      entry = f"""
        Title: {cop.title}\n
        Description: {cop.body}\n
        Product: {product.id}\n
        Product Name: {product.name}\n
        Requested Return Qty: {cop.quantity}\n\n
      """
      content += entry
    return content

  def create_ticket(self, user, order, complaint, subject, content):
    self.tickets_url = f"{self.base_url}tickets"
    self.headers["content-type"] = "application/json"
    # Data payload for ticket
    data = {
        "properties": {

            # Ticket information for customer service
            "user_id": user.id,
            "user_email": user.email,
            "order_id": order.id,
            "complaint_id": complaint.id,
            
            "subject": f"Complaint: {complaint.id}",
            "content": f"""
            User ID: {user.id}\n
            User email: {user.email}\n
            Order ID: {order.id}\n
            {self.make_content(complaint)}
            """,
            
            # Ticket settings
            "hs_pipeline": "0",
            "hs_pipeline_stage": "1",
            "hs_ticket_priority": "HIGH"
        }
    }

    # Make the POST request
    response = requests.post(self.tickets_url, headers=self.headers, json=data)
    if response.status_code == 201:
      return response.json()
    return None
  
  # def get_tickets(self,limit=10):
  #   self.tickets_url = f"{self.base_url}tickets"
  #   query_params = {"limit": limit,"properties": "hs_pipeline,hs_pipeline_stage,source_type,subject,content"}
  #   urlencoded_string = urlencode(query_params, quote_via=quote_plus)
  #   response = requests_retry_session().get(url=self.tickets_url, headers=self.headers,params=urlencoded_string)
  #   if response.status_code == 200:
  #       data = response.json()
  #       return data["results"]
  #   logger.error(f"Somthing went wrong with gettting tickets from Hubspot {response.status_code}-  {response.json()}")
  #   return None


  # def retrieve_ticket(self,ticket_id):
  #   self.tickets_url = f"{self.base_url}tickets/{ticket_id}"
  #   query_params = {"properties": "hs_pipeline,hs_pipeline_stage,source_type,subject,content"}
  #   urlencoded_string = urlencode(query_params, quote_via=quote_plus)
  #   response = requests_retry_session().get(url=self.tickets_url, headers=self.headers,params=urlencoded_string)
  #   if response.status_code == 200:
  #       return response.json()
  #   logger.error(f"Somthing went wrong with gettting the ticket id - {ticket_id} from Hubspot {response.status_code} - {response.json()}")
  #   return None