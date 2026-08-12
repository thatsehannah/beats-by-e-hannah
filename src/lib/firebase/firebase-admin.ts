import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    }),
  });
  console.log("Firebase Admin initialized successfully");
} else {
  console.log("Firebase Admin already initialized");
}

const DATABASE = process.env.NODE_ENV === "production" ? "beats" : "beats-dev";
export const adminDb = getFirestore(DATABASE);
