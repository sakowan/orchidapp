import random
import string

def gen_random_string(length=12):
    """Generates a random string of letters and digits with the specified length."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))