# Presentation Creator App

A SolidJS application that allows users to create presentations by specifying the title, number of slides, and content for each slide. The app automatically adds images to each slide and provides the functionality to download the presentation as a PPTX file.

## User Journeys

1. [Sign In](docs/journeys/sign-in.md) - Authenticate using Supabase to access presentation features.
2. [Create Presentation](docs/journeys/create-presentation.md) - Set up a new presentation with custom content and images.
3. [View Presentations](docs/journeys/view-presentations.md) - View and manage your created presentations.

## External APIs

- **Supabase**: Used for user authentication and handling user sessions.
- **Sentry**: Integrated for error logging and monitoring both frontend and backend errors.
- **Umami**: Utilized for website analytics and tracking user interactions.

## Environment Variables

The app requires the following environment variables to be set in the `.env` file:

- `COCKROACH_DB_URL`: Database connection URL.
- `NPM_TOKEN`: NPM authentication token.
- `VITE_PUBLIC_APP_ID`: Public application ID for ZAPT.
- `VITE_PUBLIC_APP_ENV`: Application environment (e.g., development, production).
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for error logging.
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`: Umami website ID for analytics tracking.

Ensure that all environment variables are correctly configured before deploying the app.

---
Documentation generated based on user-provided guidelines.