import cv2
import numpy as np
from main import AgriVi_Segmentation, AgrViCBLosses, AgrVimIOU
from keras import models
import tensorflow as tf

# freezing the model to fix the weights
def freeze(model):
    """Freeze model weights in every layer."""
    for layer in model.layers:
        layer.trainable = False

        if isinstance(layer, models.Model):
            freeze(layer)

def display_masks(img, mask):
    # Display the original image and the segmentation mask side by side
    for i in range(3,6):
        print(i)
        result1 = np.concatenate([img[0,:,:,1], mask[:,:,i]], axis=1)
        cv2.imshow('Segmentation Result', result1)
        cv2.waitKey(0)
    result1 = np.concatenate([img[0,:,:,1], mask[:,:,0]], axis=1)
    cv2.imshow('Segmentation Result', result1)
    cv2.waitKey(0)

def get_mask(image_name,display=False):
    rgb_image_path = "./samples/rgb"
    nir_image_path = "./samples/nir"

    rgb_image = cv2.imread(rgb_image_path + '\\' + image_name, cv2.IMREAD_COLOR)
    nir_image = cv2.imread(nir_image_path + '\\' + image_name, cv2.IMREAD_GRAYSCALE)
    input_size = (512, 512)
    rgb_image = cv2.resize(rgb_image, input_size)
    # Normalize the NIR image to the same range as the RGB image
    nir_image = cv2.normalize(nir_image, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX)
    # Resize the NIR image to match the size of the RGB image
    nir_image = cv2.resize(nir_image, (rgb_image.shape[1], rgb_image.shape[0]), interpolation=cv2.INTER_CUBIC)
    # Concatenate the RGB and NIR images along the channel dimension
    img = np.concatenate([rgb_image, np.expand_dims(nir_image, axis=2)], axis=-1)
    n_classes = 7
    # Normalize the image pixels
    img = img / 255.0
    optimizer = tf.keras.optimizers.SGD(learning_rate=0.001)
    loss_obj = AgrViCBLosses(num_classes=n_classes, beta=0.09, gamma=0.001)
    model = AgriVi_Segmentation(upsample_method='bilinear', output_channels=n_classes)
    freeze(model)
    model.load_weights("./best_model_miou.h5")
    model.compile(optimizer=optimizer,loss=loss_obj,metrics=[AgrVimIOU(num_classes=n_classes, per_classes=False)])
    print("Number of parameters: ", model.count_params())
    # Add an extra dimension to represent the batch size (1 in this case)
    img = np.expand_dims(img, axis=0)

    # Get the segmentation mask by passing the image through the model
    mask = model.predict(img)[0]

    print(mask[:,:,0:4].shape)
    print(img[0].shape)
    if display:
        display_masks(img, mask)
    return mask[:,:,3],mask[:,:,4]


if __name__ == '__main__':
    get_mask('1LJQVM8TW_766-7277-1278-7789.jpg',display=True)

