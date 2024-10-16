import admin from 'firebase-admin';

// Firebase Admin SDK configuration
import serviceAccount from './online-seat-booking-1b50c-firebase-adminsdk-fj9fz-12de045057.json' assert { type: 'json' };


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default admin;
