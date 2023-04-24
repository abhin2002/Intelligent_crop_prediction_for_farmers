import io
import base64
import json
from PIL import Image



def return_hard_coded_image(input_image):
    
    # Open the input image as a PIL Image object
    input_pil_image = Image.open(io.BytesIO(input_image.FILES['input_image'].read()))
    
    # Create a hard-coded image as a new PIL Image object
    # Replace the placeholder image with your own JPEG file
    hard_coded_image = Image.open("appname\satellite_model\mask image -sample.jpeg")

    # Convert the hard-coded image to binary data
    hard_coded_image_binary = io.BytesIO()
    hard_coded_image.save(hard_coded_image_binary, format='JPEG')
    hard_coded_image_binary = hard_coded_image_binary.getvalue()

    # Close the input image
    input_pil_image.close()

    # Return the hard-coded image as a binary string
    return hard_coded_image_binary
