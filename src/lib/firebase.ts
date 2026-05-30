import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebaseConfig';

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

// Only the values that must be present for analytics to initialize.
const hasConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.measurementId,
);

// Analytics is optional. Guard on real config values AND wrap in try/catch so a
// missing/blocked/failed Firebase setup can never crash the page render.
if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  hasConfig
) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  } catch {
    app = undefined;
    analytics = undefined;
  }
}

export { app, analytics };
