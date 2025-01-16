"""
##### MAIN URLS FILE #####
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from shopping.views import signup_newsletter_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),
    path("api-auth/", include('rest_framework.urls')),
    path('signup-newsletter/', signup_newsletter_view, name='signup-newsletter'),
]
