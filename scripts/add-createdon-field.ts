import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = getFirestore("beats");

const addCreatedOnField = async (): Promise<void> => {
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
    if (doc.data().createdOn) {
      console.log(`Skipping ${doc.id} because it already has createdOn field.`);
      skipped++;
      continue;
    }

    batch.update(doc.ref, { createdOn: admin.firestore.Timestamp.now() });
    queued++;
    console.log(`Queued ${doc.id}`);
  }

  if (queued > 0) {
    await batch.commit();
  }

  console.log(`Updated ${queued}, skipped ${skipped}`);
};

addCreatedOnField()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
