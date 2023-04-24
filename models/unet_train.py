import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms

import numpy as np
from PIL import Image
import os


class UNet(nn.Module):
    def __init__(self):
        super(UNet, self).__init__()
        
        # Encoder
        self.conv1 = nn.Conv2d(3, 64, kernel_size=1, padding=1)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(128, 256, kernel_size=3, padding=1)
        self.conv4 = nn.Conv2d(256, 512, kernel_size=3, padding=1)
        
        # Decoder
        self.upconv4 = nn.ConvTranspose2d(512, 256, kernel_size=2, stride=2)
        self.conv5 = nn.Conv2d(512, 256, kernel_size=3, padding=1)
        self.upconv3 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.conv6 = nn.Conv2d(256, 128, kernel_size=3, padding=1)
        self.upconv2 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.conv7 = nn.Conv2d(128, 64, kernel_size=3, padding=1)
        
        # Output
        self.conv8 = nn.Conv2d(64, 1, kernel_size=1)
        
    def forward(self, x):
        # Encoder
        x1 = nn.functional.relu(self.conv1(x))
        x2 = nn.functional.max_pool2d(x1, 2)
        x2 = nn.functional.relu(self.conv2(x2))
        x3 = nn.functional.max_pool2d(x2, 2)
        x3 = nn.functional.relu(self.conv3(x3))
        x4 = nn.functional.max_pool2d(x3, 2)
        x4 = nn.functional.relu(self.conv4(x4))
        
        # Decoder
        x = nn.functional.relu(self.upconv4(x4))
        x = torch.cat([x, x3], dim=1)
        x = nn.functional.relu(self.conv5(x))
        x = nn.functional.relu(self.upconv3(x))
        x = torch.cat([x, x2], dim=1)
        x = nn.functional.relu(self.conv6(x))
        x = nn.functional.relu(self.upconv2(x))
        x = torch.cat([x, x1], dim=1)
        x = nn.functional.relu(self.conv7(x))
        
        # Output
        x = torch.sigmoid(self.conv8(x))
        return x
class SegmentationDataset(Dataset):
    def __init__(self, image_dir, mask_dir, transform=None):
        self.image_dir = image_dir
        self.mask_dir = mask_dir
        self.image_filenames = os.listdir(image_dir)
        self.mask_filenames = os.listdir(mask_dir)
        self.transform = transform
        
    def __len__(self):
        return len(self.image_filenames)
    
    def __getitem__(self, idx):
        # Load image and mask
        image = np.array(Image.open(os.path.join(self.image_dir, self.image_filenames[idx])).convert('RGB'))
        mask = np.array(Image.open(os.path.join(self.mask_dir, self.mask_filenames[idx])).convert('L'))

        # Apply transformations if specified
        if self.transform:
            image = self.transform(image)
        
        # Convert to PyTorch tensors
        image = torch.tensor(image, dtype=torch.float32)
        mask = torch.tensor(mask, dtype=torch.float32)
        
        return image, mask
def train_unet(dataset, batch_size, num_epochs, learning_rate):
    # Create data loader
    data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # Initialize model and optimizer
    model = UNet()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)
    
    # Define loss function
    criterion = nn.BCELoss()
    
    # Train model
    for epoch in range(num_epochs):
        for batch_idx, (images, masks) in enumerate(data_loader):
            # Zero gradients
            optimizer.zero_grad()
            
            # Forward pass
            outputs = model(images)
            loss = criterion(outputs, masks)
            
            # Backward pass and update weights
            loss.backward()
            optimizer.step()
            
            # Print progress
            if (batch_idx+1) % 10 == 0:
                print('Epoch [{}/{}], Batch [{}/{}], Loss: {:.4f}'.format(
                    epoch+1, num_epochs, batch_idx+1, len(data_loader), loss.item()))

# Define image transformations
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# Create dataset
dataset = SegmentationDataset(r'D:\local\Agriculture-Vision-2021\images\rgb', r'D:\local\Agriculture-Vision-2021\boundaries', transform=transform)

# Train model
train_unet(dataset, batch_size=4, num_epochs=10, learning_rate=0.001)