import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as serviceAccount from "../../../firebase-service-account.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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
