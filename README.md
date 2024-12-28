# Presentation Content Generator App

An intelligent tool that helps users create structured content for presentations. Users can provide the title, topics, and number of slides to generate bullet-pointed content for each slide. The app also supports voice input for topic entry and allows downloading the content as a Word or PDF document.

## User Journeys

1. [Sign In](docs/journeys/sign-in.md) - Authenticate using Supabase to access presentation features.
2. [Create Presentation](docs/journeys/create-presentation.md) - Set up a new presentation with custom content and images.
3. [View Presentations](docs/journeys/view-presentations.md) - View and manage your created presentations.
4. [Generate Presentation Content](docs/journeys/generate-presentation-content.md) - Use voice input and AI to generate structured presentation content.
5. [Download Presentation](docs/journeys/download-presentation.md) - Export your presentation as PPTX, Word, or PDF documents.

## External APIs

- **Supabase**: Used for user authentication and handling user sessions.
- **Sentry**: Integrated for error logging and monitoring both frontend and backend errors.
- **Umami**: Utilized for website analytics and tracking user interactions.
- **ZAPT.AI**: Handles event creation for AI-driven content and image generation.

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