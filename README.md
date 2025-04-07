# FileManagerApp

A mobile application built with Ionic and Angular that allows you to create, read, update, and delete text files on your device.

## Features

- Create text files and save them to your device
- View a list of all saved files
- Update existing files
- Delete unwanted files
- Persistent storage using Capacitor Filesystem API
- Modern UI with Ionic components
- Dark mode support

## Screenshots

*Add screenshots of your app here*

## Prerequisites

Before running this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- [Xcode](https://developer.apple.com/xcode/) (for iOS builds, Mac only)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/FileManagerApp.git
   cd FileManagerApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Serve the application locally:
   ```bash
   ionic serve
   ```

## Building for Mobile

### Android

1. Add Android platform:
   ```bash
   ionic cap add android
   ```

2. Build the app:
   ```bash
   ionic cap build android
   ```

3. Open in Android Studio:
   ```bash
   ionic cap open android
   ```

### iOS (Mac only)

1. Add iOS platform:
   ```bash
   ionic cap add ios
   ```

2. Build the app:
   ```bash
   ionic cap build ios
   ```

3. Open in Xcode:
   ```bash
   ionic cap open ios
   ```

## Project Structure

- `src/app/home` - File creation and editing component
- `src/app/notes` - List of saved files component
- `src/app/services/file-manager.service.ts` - Service that handles file operations

## Usage

### Creating a New File

1. Navigate to the "Create" tab
2. Enter a filename in the "File Name" field
3. Enter content in the "File Content" field
4. Click the "Save File" button

### Viewing Files

1. Navigate to the "Notes" tab
2. All saved files will be displayed in a list

### Updating a File

1. Navigate to the "Notes" tab
2. Click on the file you want to update
3. Choose "Update File" from the options
4. Edit the file and click "Save File"

### Deleting a File

1. Navigate to the "Notes" tab
2. Click on the file you want to delete
3. Choose "Delete File" from the options

## Technical Details

- Built with Ionic 8 and Angular 19
- Uses Capacitor 7 for native functionality
- Files are stored in the device's Documents directory
- Implements RxJS Observables for reactive programming

## Permissions

The app requires the following permissions:
- `READ_EXTERNAL_STORAGE` - For reading files
- `WRITE_EXTERNAL_STORAGE` - For creating and updating files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)
