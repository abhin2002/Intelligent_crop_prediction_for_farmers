"""
Model to predict crop yield based on data
"""

import pandas as pd
import numpy as np

import torch
import torch.nn as nn
import torch.utils.data as data

import pytorch_lightning as pl
from pytorch_lightning import LightningDataModule

from sklearn.model_selection import StratifiedShuffleSplit

import torch.nn.functional as F

import torchmetrics

class AverageMeter:
    def __init__(self):
        self.reset()

    def reset(self):
        self.val = 0
        self.avg = 0
        self.sum = 0
        self.count = 0

    def update(self, val, n=1):
        self.val = val
        self.sum += val * n
        self.count += n
        self.avg = self.sum / self.count

def split_data(df, test_size=0.2):
    """
    Split data into train and test
    """
    X = df.drop("label", axis=1)
    y = df["label"]
    # Create a stratified shuffle split
    splitter = StratifiedShuffleSplit(n_splits=1, test_size=test_size, random_state=42)
    # Split the data into train and test sets using the splitter
    for train_idx, test_idx in splitter.split(X, y):
        X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
        y_train, y_test = y.iloc[train_idx], y.iloc[test_idx]
    return X_train, X_test, y_train, y_test


# creating a dataset adaptor


class datasetAdaptor(data.Dataset):
    def __init__(self, df, split="train"):
        self.df = df
        self.split = split
        self.normalize_data()
        self.train_x, self.test_x, self.train_y, self.test_y = split_data(self.df)
        self.mapping = self.classmapping()
        print("Classes : ", self.mapping)
    def __len__(self):
        if self.split == "train":
            return len(self.train_x)
        else:
            return len(self.test_x)

    def __getitem__(self, idx):
        if self.split == "train":
            x = self.train_x.iloc[idx]
            y = self.train_y.iloc[idx]
        else:
            x = self.test_x.iloc[idx]
            y = self.test_y.iloc[idx]
        x = torch.tensor(x.values, dtype=torch.float)
        y = self.mapping.index(y)
        y = torch.tensor(y, dtype=torch.float)
        return x, y

    def classmapping(self):
        """
        Map the class to a number
        """
        return list(self.df["label"].unique())

    def normalize_data(self):
        """
        Normalize data

        TODO: Use the mean values from the standard data recommended govt.
        """
        for col in self.df.columns[:-1]:
            self.df[col] = (self.df[col] - self.df[col].mean()) / self.df[col].std()
        return self.df


class cropDataModule(LightningDataModule):
    """
    Data module for crop prediction

    Args:
        dataset (pd.DataFrame): Dataset to use
        batch_size (int, optional): Batch size. Defaults to 32.
        num_workers (int, optional): Number of workers. Defaults to 4.
    """

    def __init__(self, dataset, batch_size=124, num_workers=0):
        super().__init__()
        self.df = dataset
        self.batch_size = batch_size
        self.num_workers = num_workers

    def train_dataset(self, df):
        return datasetAdaptor(df, split="train")

    def val_dataset(self, df):
        return datasetAdaptor(df, split="test")

    def train_dataloader(self):
        train_dataset = self.train_dataset(self.df)
        train_loader = data.DataLoader(
            train_dataset,
            batch_size=self.batch_size,
            num_workers=self.num_workers,
            shuffle=True,
            pin_memory=True,
            drop_last=True,
            collate_fn=self.collate_fn,
        )
        return train_loader

    def val_dataloader(self):
        val_dataset = self.val_dataset(self.df)
        val_loader = data.DataLoader(
            val_dataset,
            batch_size=self.batch_size,
            num_workers=self.num_workers,
            shuffle=True,
            pin_memory=True,
            drop_last=True,
            collate_fn=self.collate_fn,
        )
        return val_loader

    @staticmethod
    def collate_fn(batch):
        labels, targets = tuple(zip(*batch))
        labels = torch.stack(labels, dim=0)
        targets = torch.stack(targets, dim=0)
        return labels, targets


class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        self.fc1 = nn.Linear(7, 14)
        self.fc2 = nn.Linear(14, 70)
        self.fc3 = nn.Linear(70, 35)
        self.fc4 = nn.Linear(35, 22)
        self.softmax = nn.Softmax(dim=1)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.2)
        self.batchnorm1 = nn.BatchNorm1d(10)
        self.batchnorm2 = nn.BatchNorm1d(20)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc2(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc3(x)
        x = self.relu(x)
        x = self.dropout(x)
        x = self.fc4(x)
        return x

class predictionModule(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.model = Model()
        self.loss_fn = nn.CrossEntropyLoss()
        self.accuracy = torchmetrics.Accuracy()
        self.avg_acc = AverageMeter()

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        x, y = batch
        y = y.long()
        y_hat = self.model(x)
        loss = self.loss_fn(y_hat, y)
        self.log("train_loss", loss)
        return loss

    def validation_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self(x)
        y = y.long()
        loss = self.loss_fn(y_hat, y)
        self.log("val_loss", loss)
        self.log("val_acc", self.accuracy(y_hat, y))
        self.avg_acc.update(self.accuracy(y_hat, y))
        return loss
    def validation_epoch_end(self, outputs) -> None:
        print("\n\nAverage accuracy : ", float(self.avg_acc.avg)*100,"%")
        self.avg_acc.reset()
    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=0.001)

def train():
    data = pd.read_csv("./data/Crop_recommendation.csv")
    model = predictionModule()
    dm = cropDataModule(data)
    trainer = pl.Trainer(max_epochs=300)
    trainer.fit(model, dm)
    torch.save(model.model.state_dict(), "./model.pth")

def evaluate(input_data):
    df = pd.read_csv("./data/Crop_recommendation.csv")
    means = [df[col].mean() for col in df.columns[:-1]]
    stds = [df[col].std() for col in df.columns[:-1]]
    normal_data = torch.tensor([(input_data[i] - means[i])/stds[i] for i in range(len(input_data))],dtype=torch.float)
    model = predictionModule()
    class_list = df["label"].unique()
    model.model.load_state_dict(torch.load("./model.pth"))
    model.eval()
    y = model(normal_data)
    probabilities = F.softmax(y, dim=0)
    print(probabilities)
    confidence_score, predicted_class = torch.max(probabilities, dim=0)
    print(f"Predicted class: {class_list[predicted_class.item()]}, Confidence score: {confidence_score.item()}")
if __name__ == "__main__":
    raw_input_data = [85,58,41,21.77046169,80.31964408,7.038096361,226.6555374]
    evaluate(raw_input_data)
