# firebase_test

A simple full-stack Firebase demo app built with **React + Vite** and **Firebase** (Authentication + Firestore).

## Features

- Email/password sign-up and login
- Displays **"Hello <name>"** after login
- Update your display name
- Delete your account
- Data stored in Firestore (`users` collection)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Auth | Firebase Authentication (email/password) |
| Database | Firebase Firestore |
| Hosting | Firebase Hosting |

## Getting Started

### 1. Clone & install dependencies

```bash
git clone <repo-url>
cd firebase_test
npm install
```

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Email/Password** sign-in under **Authentication → Sign-in method**.
3. Create a **Firestore** database (start in test mode for development).
4. Register a **Web App** in **Project Settings** and copy the SDK config values.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your Firebase project values:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Firestore Data Model

**Collection:** `users`

```json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

## Deploy to Firebase Hosting

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Update .firebaserc with your project ID, then build and deploy
npm run build
firebase deploy
```
