// Command to run: npx tsx scripts/add-sampleinfo-field.ts
// For prod only

import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = getFirestore("beats");

const addSampleInfoField = async (): Promise<void> => {
  const snapshot = await db.collection("beat-metadata").get();

  if (snapshot.empty) {
    console.log("No documents found.");
  }

  const batch = db.batch();
  let skipped = 0;
  let queued = 0;

  for (const doc of snapshot.docs) {
    if (doc.data().sampleInfo) {
      console.log(
        `Skipping ${doc.id} because it already has sampleInfo field.`,
      );
      skipped++;
      continue;
    }

    const discogsInfo = doc.data()["discogs-info"];

    if (!discogsInfo) {
      console.log(
        `Skipping ${doc.id} because the discogs-info field doesn't exist on this doc.`,
      );
      skipped++;
      continue;
    }

    const sampleInfo = [
      {
        releaseId: doc.data()["discogs-info"].releaseId,
        trackPosition: doc.data()["discogs-info"].trackPosition,
        url: doc.data()["discogs-info"].url,
      },
    ];

    console.log(sampleInfo);

    batch.update(doc.ref, { sampleInfo: sampleInfo });
    queued++;
  }

  if (queued > 0) {
    await batch.commit();
  }

  console.log(`Updated ${queued}, skipped ${skipped}`);
};

addSampleInfoField()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
