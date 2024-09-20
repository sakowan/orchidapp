import random
import string

def gen_random_string(length=12):
    """Generates a random string of letters and digits with the specified length."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def complaint_img_upload_path(instance, filename):
    return f'complaints/{instance.complaint_order_product.complaint.id}/{filename}'
