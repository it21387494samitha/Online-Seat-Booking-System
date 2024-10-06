import admin from 'firebase-admin';
import ServiceAccount from './config/serviceAccountKey.json' assert { type: 'json' }; // Import JSON with assertion

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});

export default admin;
