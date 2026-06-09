import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = getFirestore("beats");

const deleteSpotifyField = async (): Promise<void> => {
  const snapshot = await db.collection("beat-metadata").get();

  if (snapshot.empty) {
    console.log("No documents found in beat-metadata.");
    return;
  }

  console.log(`Found ${snapshot.size} documents. Updating...`);

  const batch = db.batch();
  let skipped = 0;
  let queued = 0;

  for (const doc of snapshot.docs) {
    if (!doc.data().sampleSpotifyId) {
      console.log(
        `Skipping ${doc.id} because the sampleSpotifyId field has already been removed.`,
      );
      skipped++;
      continue;
    }

    // delete sample here maybe?
    batch.update(doc.ref, {
      sampleSpotifyId: admin.firestore.FieldValue.delete(),
    });
    queued++;
    console.log(`Queued ${doc.id}`);
  }

  if (queued > 0) {
    await batch.commit();
  }

  console.log(`Updated ${queued}, skipped ${skipped}`);
};

deleteSpotifyField()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
