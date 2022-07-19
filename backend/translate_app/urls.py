from django.urls import path
from .views import TextAPIView

urlpatterns = [
        path('texts', TextAPIView.as_view()),
        path('texts/<str:pk>', TextAPIView.as_view()) # to capture our ids
    ]
