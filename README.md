# REST Client

A lightweight **REST Client** inspired by Postman – a web application that allows users to send HTTP requests, view responses, manage variables and review request history. Built with **Next.js**, **TypeScript** and **Firebase** for authentication and data storage.

💡 Developed as a **team project** during the [**RS School React course**](https://rs.school/courses/reactjs).

## Overview

The **REST Client** provides an intuitive interface for testing and exploring APIs.

Users can:

- Send requests using any HTTP method
- Edit headers and request body
- View generated request code in multiple languages
- Keep track of request history
- Manage custom variables
- Work securely with authentication and private routes

## Key Features

- **Authentication & Authorization** – user registration and sign-in via Firebase
- **Internationalization (i18n)** – multi-language interface
- **REST Client** – request editor with method, URL, headers and body
- **History & Analytics** – view previously executed requests
- **Variables** – manage and use custom variables
- **Code Generation** – generate request code in various languages
- **Error Handling** – user-friendly error notifications
- **Modern UI/UX** – fully responsive, themeable interface built with Tailwind CSS and shadcn/ui

## Tech Stack

| Technology                | Badge                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Next.js**               | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)                 |
| **React**                 | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)           |
| **TypeScript**            | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)        |
| **Firebase**              | ![Firebase](https://img.shields.io/badge/Firebase-a08021?logo=firebase&logoColor=ffcd34)             |
| **Tailwind CSS**          | ![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)       |
| **shadcn/ui**             | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logoColor=white)                          |
| **Vitest**                | ![Vitest](https://img.shields.io/badge/Vitest-252529?logo=vitest&logoColor=FCC72B)                   |
| **React Testing Library** | ![RTL](https://img.shields.io/badge/ReactTestingLibrary-E33332?logo=testing-library&logoColor=white) |

## Getting Started

1. Clone the repository

   ```
   git clone https://github.com/alexspearsi/rest-client-app.git
   ```

2. Navigate to the project folder

   ```
   cd rest-client-app
   ```

3. Install dependencies

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase credentials:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=<your-api-key>
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-project-id>
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
   NEXT_PUBLIC_FIREBASE_APP_ID=<your-app-id>
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-measurement-id>

   FIREBASE_PROJECT_ID=<your-project-id>
   FIREBASE_CLIENT_EMAIL=<your-client-email>
   FIREBASE_PRIVATE_KEY=<your-private-key>
   ```

5. Run the project

   ```
   npm run dev
   ```

6. Open http://localhost:3000 in your browser to view the application.

## Available Scripts

The following scripts are available in the project:

```
npm run dev                # Start the development server.
npm run build              # Builds the project for production
npm run start              # Preview the production build locally.
npm run test               # Runs tests using Vitest.
npm run test:coverage      # Runs tests and generates a coverage report using Vitest.
npm run lint               # Runs ESLint and automatically fixes fixable issues.
npm run format:fix         # Formats files using Prettier.
npm run prepare            # Setup Husky hooks.
```

## Authors

- 🐱‍💻 **Team Lead:** [Aliaksandr Strelchanka](https://github.com/alexspearsi)
- 🐱‍💻 **Developer:** [Mikhail Il'in](https://github.com/firstDayAtWork)
- 🐱‍💻 **Developer:** [Olga Dubodel](https://github.com/olydbd)
