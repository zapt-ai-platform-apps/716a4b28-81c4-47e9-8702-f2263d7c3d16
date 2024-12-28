import { initializeZapt } from '@zapt/zapt-js';
import * as Sentry from '@sentry/browser';

export const { createEvent, supabase } = initializeZapt(import.meta.env.VITE_PUBLIC_APP_ID);

// Initialize Sentry for frontend events within the supabaseClient if needed
Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID
    }
  }
});