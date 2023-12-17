```markdown
# MobileHub

## Description

Briefly describe your project here.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js v18.17.1
- .NET 7
- Expo CLI
- Expo Go app: Install on your iOS or Android device from the [App Store](https://apps.apple.com/us/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).

### Installing

- Clone the repository:
   ```bash
   git clone https://github.com/Pablo-RoVi/MobileHub.git
   ```

## Start backend
1. Restore dependencies
   ```bash
   cd backend/MobileHub
   dotnet restore
   ```

2. Configure .env and appsettings.json
   - Change .env.example to .env and put your GitHub Personal Access Tokens, any GitHub user and your IPv4 Direction instead localhost
   ```bash
    GITHUB_ACCESS_TOKEN=YOUR_GITHUB_ACCESS_TOKEN
    GITHUB_ACCESS_USER=YOUR_GITHUB_ACCESS_USER
    LOCAL_IP=http://localhost:8081
   ```
   - Change appsettings.example.json to appsettings.json and put your 256bits ultra secret token
   ```bash
      "AppSettings": {
         "Token": "your_ultra_secret_token"
      }
   ```

3. Configure launchSettings.json
   - Change localhost to your IPv4 Direction
   ```bash
      "profiles": {
         "http": {
            "commandName": "Project",
            "dotnetRunMessages": true,
            "launchBrowser": true,
            "launchUrl": "swagger",
            "applicationUrl": "http://localhost:5071",
            "environmentVariables": {
            "ASPNETCORE_ENVIRONMENT": "Development"
            }
         },
      }
   ```

4. Make the migrations
   ```bash
    dotnet ef database update
   ```

5. Build the project
   ```bash
    dotnet build
   ```

6. Start the application
   ```bash
    dotnet run
   ```

## Start frontend

- First of all, create another terminal to still running backend, then install dependencies:
   ```bash
   cd frontend/MobileHub
   npm install
   ```

### Running the App

1. Start the Expo development server:
   ```bash
   npx expo start
   ```

2. Scan the QR code with the Expo Go app on your device, or run the app on an emulator.
