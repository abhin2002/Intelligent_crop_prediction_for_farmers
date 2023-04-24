from django.urls import path
from appname import views

urlpatterns = [
    path('v1/evaluate', views.evaluate_inputs, name='evaluate_inputs'),
    path('v1/process', views.return_hard_coded_image, name='return_hard_coded_image')
]
