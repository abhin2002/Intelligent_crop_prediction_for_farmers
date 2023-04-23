from django.http import HttpResponse
from django.shortcuts import render

from .data_model.croppredict import evaluate

from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse


@csrf_exempt
def evaluate_inputs(request):
    print("~~~Evaluate called~~~")
    data = json.loads(request.body)
    print(data)
    input_list = data['input_list']
    print(input_list)
    confidence_score, crop, predictions = evaluate(input_list) # Call the 'evaluate' function with the input list
    print(predictions)
    return JsonResponse({'crop':crop,'score':confidence_score,'predictions':predictions,'success': True})
