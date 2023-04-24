from django.http import HttpResponse, HttpResponseServerError
from django.shortcuts import render

from .data_model.croppredict import evaluate

from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import base64
import json

from .satellite_model.satelliteImagePredict import return_hard_coded_image
import base64
import json

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
    try:
        # Extract the image data from the JSON request
        json_data = json.loads(request.body)
        image_data = json_data['image_data']
        
        # Decode the base64-encoded image data
        image_bytes = base64.b64decode(image_data)
        
        # Call the image processing function with the decoded image data
        processed_image = return_hard_coded_image(image_bytes)
        
        # Convert the processed image to base64-encoded bytes
        processed_image_data = base64.b64encode(processed_image)
        
        # Convert the base64-encoded bytes to a string
        processed_image_data_str = processed_image_data.decode('utf-8')
        
        # Create a JSON response containing the processed image data
        response_data = {'processed_image_data': processed_image_data_str}
        response_json = json.dumps(response_data)
        
        return HttpResponse(response_json, content_type='application/json')
    
    except Exception as e:
        print("Error processing image: ", e)
        return HttpResponseServerError("Error processing image")
