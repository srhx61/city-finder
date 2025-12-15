# Azure App Service Deployment Script for PowerShell

# Variables - Update these with your values
$RESOURCE_GROUP = "city-finder-rg"
$APP_NAME = "city-finder-app"
$LOCATION = "switzerlandnorth"
$SKU = "F1"  # Free tier, change to B1 for production

Write-Host "Building the application..." -ForegroundColor Green
npm run build

Write-Host "Creating resource group..." -ForegroundColor Green
az group create --name $RESOURCE_GROUP --location $LOCATION

Write-Host "Creating App Service plan..." -ForegroundColor Green
az appservice plan create `
  --name "${APP_NAME}-plan" `
  --resource-group $RESOURCE_GROUP `
  --sku $SKU `
  --is-linux

Write-Host "Creating web app..." -ForegroundColor Green
az webapp create `
  --name $APP_NAME `
  --resource-group $RESOURCE_GROUP `
  --plan "${APP_NAME}-plan" `
  --runtime "NODE:20-lts"

Write-Host "Configuring app settings..." -ForegroundColor Green
az webapp config appsettings set `
  --resource-group $RESOURCE_GROUP `
  --name $APP_NAME `
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true POST_BUILD_COMMAND="npm run build"

Write-Host "Setting startup command..." -ForegroundColor Green
az webapp config set `
  --resource-group $RESOURCE_GROUP `
  --name $APP_NAME `
  --startup-file "npm start"

Write-Host "Deployment URL: https://${APP_NAME}.azurewebsites.net" -ForegroundColor Cyan
Write-Host "Deploy your code using: az webapp up --name $APP_NAME --resource-group $RESOURCE_GROUP" -ForegroundColor Yellow

