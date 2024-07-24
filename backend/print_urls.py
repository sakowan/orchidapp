import os
import django
from django.urls import get_resolver

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django.setup()

def print_urls(url_patterns, indent=0):
    for pattern in url_patterns:
        if hasattr(pattern, 'url_patterns'):
            print('  ' * indent + f'[{pattern.pattern}]')
            print_urls(pattern.url_patterns, indent + 1)
        else:
            print('  ' * indent + f'{pattern.pattern}')

if __name__ == "__main__":
    url_patterns = get_resolver().url_patterns
    print_urls(url_patterns)
