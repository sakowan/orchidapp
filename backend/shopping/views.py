from django.shortcuts import render

def signup_newsletter_view(request):
  return render(request, 'SignupNewsletter.html')
