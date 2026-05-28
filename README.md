# Mobile Boilerplate

Production-ready reusable React Native boilerplate built with Expo, React Navigation, Axios, Context API, AsyncStorage, React Hook Form, Yup, React Native Paper, Expo Notifications, and Expo vector icons.

## Quick Start

```bash
cd mobile-boilerplate
npm install
npx expo start
```

Update the API endpoint with environment variables or in `app/constants/config.js`:

```bash
EXPO_PUBLIC_API_PROVIDER=mockapi
EXPO_PUBLIC_MOCK_API_BASE_URL=https://your-project-id.mockapi.io/api/v1
```

Use `EXPO_PUBLIC_API_PROVIDER=server` and set `EXPO_PUBLIC_SERVER_BASE_URL` when you move to a real backend.

## MockAPI Setup

Create a project on MockAPI and add these resources:

```text
users
- username: string
- password: string
- email: string
- roles: array or comma-separated string
- createdAt: date string

items
- title: string
- amount: number
- description: string
- createdAt: date string
```

MockAPI mode uses `/users` for register/login because MockAPI resources are REST collections rather than custom `/auth/login` actions. The app still persists the returned mock user and generated token with AsyncStorage.

## API Contract

Server mode expects these generic endpoints:

```text
POST   /auth/login
POST   /auth/register
GET    /items?page=1&limit=20
GET    /items/:id
POST   /items
PUT    /items/:id
DELETE /items/:id
```

Authentication responses can include a token as `token`, `accessToken`, or `access_token`, with optional user data under `user` or `data.user`.
