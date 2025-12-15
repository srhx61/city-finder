# Azure Deployment Options

## Deployment Options for Your Node.js Application

### 1. **Azure App Service** (Recommended) ⭐
- **Best for**: Web applications, REST APIs
- **Pros**: 
  - Easy deployment via Azure CLI, Git, or VS Code
  - Automatic scaling
  - Built-in CI/CD support
  - Free tier available
  - Supports SQLite file-based databases
- **Cons**: 
  - SQLite database resets on app restart (use persistent storage for production)
- **Cost**: Free tier available, then pay-as-you-go

### 2. **Azure Container Instances (ACI)**
- **Best for**: Containerized applications
- **Pros**: Simple container hosting
- **Cons**: Requires Docker setup, more complex
- **Cost**: Pay per second

### 3. **Azure Kubernetes Service (AKS)**
- **Best for**: Large-scale, production workloads
- **Pros**: Full orchestration, high availability
- **Cons**: Complex setup, overkill for simple apps
- **Cost**: Cluster costs + node costs

### 4. **Azure Functions**
- **Best for**: Serverless, event-driven apps
- **Pros**: Pay per execution, auto-scaling
- **Cons**: Requires refactoring to function-based architecture
- **Cost**: Consumption plan (pay per execution)

## Recommended: Azure App Service

For your city-finder application, **Azure App Service** is the best choice because:
- Simple deployment process
- Works perfectly with Express.js
- SQLite database works (though consider Azure SQL for production)
- Easy to update and maintain

## Deployment Steps

See the commands below to deploy using Azure CLI.

