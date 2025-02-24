# 🌺 OrchidApp Version 1. 
An E-Commerce platform selling beauty products.

## ⚙️ Tech Stack
- **Backend:** Python Django (Database models, APIs, Authentication, etc.)
- **Frontend:** ReactJS, JavaScript
- **Database:** PostgreSQL
- **Third-Party Integrations:** Stripe, HubSpot, AWS-S3, AWS-SES

## 🚀 Key Features
- **Account creation & mailing service:** New users can create accounts and receive welcome emails.
- **Cart and Checkout:** Add products to your cart and complete the purchase process through **Stripe payments. 💳
- **Complaint submission:** Users can submit complaints about orders, attach images, and the complaint is uploaded to an **S3 bucket**. 🚚
- **HubSpot Integration:** Complaints auto-generate tickets on the **HubSpot dashboard** for customer service tracking. 🛠️

Note: This is a slightly older version of the application to protect the current version being used by the company.
## The landing page
<img width="1470" alt="Screenshot 2025-02-23 at 16 41 57" src="https://github.com/user-attachments/assets/448272f5-9671-4683-a68b-a7c0e94ed939" />

<br/>
<br/>

## The products page
<img width="1470" alt="Screenshot 2025-02-23 at 16 40 03" src="https://github.com/user-attachments/assets/bf32616f-3c38-4206-88db-a323078a172a" />

<br/>
<br/>

## Filter products by product name
<img width="1470" alt="Screenshot 2025-02-23 at 16 40 53" src="https://github.com/user-attachments/assets/b35128c2-7cee-4287-acce-9ecfbe20425f" />

<br/>
<br/>

## Product view page of a single product
<img width="1470" alt="Screenshot 2025-02-23 at 15 48 54" src="https://github.com/user-attachments/assets/1edf0e40-5cb1-4e46-af03-98e7c833cc7f" />

<br/>
<br/>

## Add multiple items to your basket
<img width="1470" alt="Screenshot 2025-02-23 at 15 50 23" src="https://github.com/user-attachments/assets/1e6a765b-649a-4e3b-ba2b-35001029b178" />

<br/>
<br/>

## All address fields must be filled in before you can proceed to the next step
<img width="1470" alt="Screenshot 2025-02-23 at 15 50 45" src="https://github.com/user-attachments/assets/7f086fbe-9ecc-49b4-ae2d-f99676ad88a0" />

<br/>
<br/>

## Correctly entered fields can continue to the next step
<img width="1470" alt="Screenshot 2025-02-23 at 15 51 42" src="https://github.com/user-attachments/assets/7203a270-5be0-48e6-8e24-4ad620a0e170" />

<br/>
<br/>

## Select your shipping method
<img width="1470" alt="Screenshot 2025-02-23 at 15 51 52" src="https://github.com/user-attachments/assets/cc4e26a9-b5ce-4e1f-ac85-26c6688dd324" />

<br/>
<br/>

## Make your payment
<img width="1470" alt="Screenshot 2025-02-23 at 15 52 42" src="https://github.com/user-attachments/assets/5b237b1a-eb84-48cb-8b43-754c66718434" />

<br/>
<br/>

## Order successfully placed
<img width="1470" alt="Screenshot 2025-02-23 at 15 53 28" src="https://github.com/user-attachments/assets/4993cc0c-8f0b-4896-8fb4-e0fa4a5f47a3" />

<br/>
<br/>

## The STRIPE dashboard showing your order went through
<img width="1470" alt="Screenshot 2025-02-23 at 16 21 44" src="https://github.com/user-attachments/assets/daaa744b-583a-401e-b29f-35f53c5b85ba" />

<br/>
<br/>

## You can see a list of the orders you've placed
<img width="1470" alt="Screenshot 2025-02-24 at 16 55 10" src="https://github.com/user-attachments/assets/0472752c-f96b-4337-842c-72ac8dd71c5e" />

<br/>
<br/>

## You can choose to submit a Complaint on an order. For orders where multiple items were purchased, you can choose which items you're having an issue with.
<img width="1470" alt="Screenshot 2025-02-24 at 16 57 04" src="https://github.com/user-attachments/assets/98d0bf1d-bc3d-491e-81f7-edf0ddcea55f" />
<img width="1470" alt="Screenshot 2025-02-24 at 16 56 31" src="https://github.com/user-attachments/assets/4418c0ab-b44c-43c3-b665-eb2fa81179c3" />

<br/>
<br/>

## Submit the Complaint
<img width="1470" alt="Screenshot 2025-02-24 at 16 59 15" src="https://github.com/user-attachments/assets/1f491771-76e7-4a9f-ad1e-e7a2be76e5fa" />
<img width="1470" alt="Screenshot 2025-02-24 at 16 59 30" src="https://github.com/user-attachments/assets/4cd1860c-b956-4389-b5cb-81a755997cf3" />

<br/>
<br/>

## A successfully submitted Complaint will have a green success flash message with the Return ID
<img width="1470" alt="Screenshot 2025-02-24 at 16 59 40" src="https://github.com/user-attachments/assets/78e220b0-1c71-4bd2-a74b-e3d8eacabecd" />

<br/>
<br/>

## A HubSpot ticket will with the Complaint ID as an identifier
<img width="1470" alt="Screenshot 2025-02-24 at 17 01 08" src="https://github.com/user-attachments/assets/0a9549d8-eabf-4c2e-8949-e3abe5a5e769" />

<br/>
<br/>

## You can find the Complaint details within the HubSpot ticket description
<img width="1470" alt="Screenshot 2025-02-24 at 17 01 27" src="https://github.com/user-attachments/assets/a72797c1-dafe-4f44-8bd5-e9ac05b72c24" />

<br/>
<br/>

## Any pictures attached by the user to the Complaint  will be stored in a subfolder in the S3 bucket as complaints/<COMPLAINT_ID>
<img width="1470" alt="Screenshot 2025-02-24 at 17 01 39" src="https://github.com/user-attachments/assets/9de3fbb0-6abe-4b77-90ca-ec4e2878d78f" />

<br/>
<br/>

## As you can see, the images are inside the correct folder
<img width="1470" alt="Screenshot 2025-02-24 at 17 01 53" src="https://github.com/user-attachments/assets/07ba58cd-65a0-4f48-ac9d-c84c5b531102" />
