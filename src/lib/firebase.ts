import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './firebaseConfig';

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  !getApps().length
) {
  app = initializeApp(firebaseConfig);
  if ('measurementId' in firebaseConfig) {
    analytics = getAnalytics(app);
  }
}

export { app, analytics };
