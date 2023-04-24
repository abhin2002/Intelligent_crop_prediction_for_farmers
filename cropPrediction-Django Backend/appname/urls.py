from django.urls import path
from appname import views

urlpatterns = [
    path('v1/evaluate', views.evaluate_inputs, name='evaluate_inputs'),
    path('v1/process', views.process_image_from_json, name='process_image_from_json')
]
