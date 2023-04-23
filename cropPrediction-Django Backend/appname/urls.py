from django.urls import path
from appname import views

urlpatterns = [
    path('v1/evaluate', views.evaluate_inputs, name='evaluate_inputs'),
]
