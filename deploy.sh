#!/bin/bash
# Azure App Service Deployment Script

# Variables - Update these with your values
RESOURCE_GROUP="city-finder-rg"
APP_NAME="city-finder-app"
LOCATION="switzerlandnorth"
SKU="F1"  # Free tier, change to B1 for production

echo "Building the application..."
npm run build

echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "Creating App Service plan..."
az appservice plan create \
  --name "${APP_NAME}-plan" \
  --resource-group $RESOURCE_GROUP \
  --sku $SKU \
  --is-linux

echo "Creating web app..."
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan "${APP_NAME}-plan" \
  --runtime "NODE:20-lts"

echo "Configuring app settings..."
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --settings \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true \
    POST_BUILD_COMMAND="npm run build"

echo "Setting startup command..."
az webapp config set \
  --resource-group $RESOURCE_GROUP \
  --name $APP_NAME \
  --startup-file "npm start"

echo "Deployment URL: https://${APP_NAME}.azurewebsites.net"
echo "Deploy your code using: az webapp up --name $APP_NAME --resource-group $RESOURCE_GROUP"

