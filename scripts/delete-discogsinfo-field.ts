// Command to run: npx tsx scripts/delete-discogsinfo-field.ts

import * as admin from "firebase-admin";
import { adminDb } from "../src/lib/firebase/firebase-admin";

const deleteDiscogsInfoField = async (): Promise<void> => {
  const snapshot = await adminDb.collection("beat-metadata").get();

  if (snapshot.empty) {
    console.log("No documents found in beat-metadata.");
    return;
  }

  console.log(`Found ${snapshot.size} documents. Updating...`);

  const batch = adminDb.batch();
  let skipped = 0;
  let queued = 0;

  for (const doc of snapshot.docs) {
    if (!doc.data()["discogs-info"]) {
      console.log(
        `Skipping ${doc.id} because the discogs-info field does not exist.`,
      );
      skipped++;
      continue;
    }

    batch.update(doc.ref, {
      "discogs-info": admin.firestore.FieldValue.delete(),
    });
    queued++;
    console.log(`Queued ${doc.id}`);
  }

  if (queued > 0) {
    await batch.commit();
  }

  console.log(`Updated ${queued}, skipped ${skipped}`);
};

deleteDiscogsInfoField()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
