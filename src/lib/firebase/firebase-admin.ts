import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
  console.log("Firebase Admin initialized successfully");
} else {
  console.log("Firebase Admin already initialized");
}

const isProd = process.env.NODE_ENV === "production";

const DATABASE = isProd ? "beats" : "beats-dev";
const BUCKET = isProd
  ? "beats-by-ehannah.firebasestorage.app"
  : "beats-by-ehannah-dev";
export const adminDb = getFirestore(DATABASE);
export const adminStorage = getStorage().bucket(BUCKET);
