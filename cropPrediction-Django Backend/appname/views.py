from django.http import HttpResponse, HttpResponseServerError
from django.shortcuts import render

from .data_model.croppredict import evaluate

from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import base64
import json

from .segmentation.display import get_mask
import base64
import json
import os

@csrf_exempt
def evaluate_inputs(request):
    print("~~~Evaluate called~~~")
    data = json.loads(request.body)
    print(data)
    input_list = data['input_list']
    print(input_list)
    print(type(input_list))
    result = evaluate(input_list) # Call the 'evaluate' function with the input list
    print(result)
    return JsonResponse(result, safe=False)


@csrf_exempt
def process_image_from_json(request):
    # Extract the image name from the form data
    image_name = request.POST.get('filename')
    print(image_name)
    print("-----------------")


    # Call the image processing function with the image name
    mask1, mask2, mask3 = get_mask(image_name)

    # Save each mask to a file
    file_path1 = os.path.join('maskImages', image_name + '_mask1.jpg')
    with open(file_path1, 'wb') as f:
        f.write(mask1)
    file_path2 = os.path.join('maskImages', image_name + '_mask2.jpg')
    with open(file_path2, 'wb') as f:
        f.write(mask2)
    file_path3 = os.path.join('maskImages', image_name + '_mask3.jpg')
    with open(file_path3, 'wb') as f:
        f.write(mask3)

    return JsonResponse("Masks detected")
