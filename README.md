# Diary Web App

## Introduction

Welcome to the Diary Web App! This web application allows users to create an account, log in, and add diary entries. Users can securely manage their diary entries with JWT authentication. The app is built using HTML, CSS, React, and Webpack for the frontend, and has a backend implementation for managing users and entries.

## Features

- User Authentication: Create an account, log in, and log out using JWT authentication.
- Diary Entries: Add, view, edit, and delete your diary entries.
- Responsive Design: Works seamlessly on both desktop and mobile devices.


## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/diary-web-app.git

   ```
   cd diary-web-app


Install dependencies:
    -npm install

Start the development server:
    - npm start
Backend
The backend for this app is implemented separately. You can find the backend repository here
    ```
    https://github.com/kabuiya/myDiaryEndpoints ```

### Configuration
- Webpack
- The project uses Webpack for bundling. The configuration files are located in the root directory:
- webpack.common.js
- webpack.dev.js
- webpack.prod.js




### Usage
 User Authentication
- Register: Create a new account by providing your email and password.
- Login: Log in using your registered email and password. A JWT token will be stored in your browser's local storage.
- Logout: Log out to clear the JWT token from local storage.
Managing Diary Entries
- Add Entry: Click the "Add Entry" button to create a new diary entry.
- View Entries: All your diary entries are displayed on the main page.
- Edit Entry: Click the "Edit" button next to an entry to update it.
- Delete Entry: Click the "Delete" button next to an entry to remove it.
Contributing
- Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.


