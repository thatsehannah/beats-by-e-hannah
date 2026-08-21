import * as admin from "firebase-admin";
import { adminDb, adminStorage } from "../src/lib/firebase/firebase-admin";
import * as readline from "readline";
import { exec } from "child_process";
import { SampleInfo } from "../src/lib/types";
import path from "path";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const query = (q: string): Promise<string> => {
  return new Promise((resolve) => readLine.question(q, resolve));
};

const selectFileWithFinder = (
  queryText: string,
  fileType: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const appleScript = `
      set theFile to choose file with prompt "${queryText}" of type {"${fileType}"}
      POSIX path of theFile
    `;

    exec(`osascript -e '${appleScript}'`, (error, stdout) => {
      if (error) {
        reject(new Error(`File selection canceled or failed for ${fileType}.`));
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

const collectSamples = async (): Promise<SampleInfo[]> => {
  const samples: SampleInfo[] = [];
  let addingSamples = true;

  console.log("\n--- Sample Info ---");
  while (addingSamples) {
    const releaseId = await query("Sample release ID: ");
    const trackPosition = await query("Sample track position: ");
    const url = await query("Discogs url: ");

    samples.push({ releaseId, trackPosition, url });
    const addAnother = await query("Need to add another sample? (y/N): ");
    if (addAnother.trim().toLowerCase() !== "y") {
      addingSamples = false;
    }
  }

  return samples;
};

const uploadBeat = async (): Promise<void> => {
  try {
    const title = await query("Title of beat: ");
    const sampleInfo = await collectSamples();

    readLine.close();

    console.log("\nOpening Finder to select MP3 file...");
    const mp3Path = await selectFileWithFinder("Select the beat", "mp3");

    console.log("\nOpening Finder to select MP4 file...");
    const mp4Path = await selectFileWithFinder("Select the video", "mp4");

    // Uploading to Firebase
    console.log("\nUploading files to Firebase Storage...");

    const mp3FileName = `beats/${path.basename(mp3Path)}`;
    const mp4FileName = `videos/${path.basename(mp4Path)}`;

    const [mp3Upload] = await adminStorage.upload(mp3Path, {
      destination: mp3FileName,
      metadata: { contentType: "audio/mpeg" },
    });

    const [mp4Upload] = await adminStorage.upload(mp4Path, {
      destination: mp4FileName,
      metadata: { contentType: "video/mp4" },
    });

    await mp3Upload.makePublic();
    await mp4Upload.makePublic();

    const mp3Url = mp3Upload.publicUrl();
    const mp4Url = mp4Upload.publicUrl();

    console.log("Adding beat to Firestore...");
    const docName = path.basename(mp3Path).replace(".mp3", "");
    await adminDb.collection("beat-metadata").doc(docName).set({
      title,
      sampleInfo,
      src: mp3Url,
      video: mp4Url,
      createdOn: admin.firestore.Timestamp.now(),
    });

    console.log(`Successfully added ${docName} to beat-metadata`);
  } catch (err) {
    readLine.close();
    throw err;
  }
};

uploadBeat()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\nError uploading beat:", err.message);
    process.exit(1);
  });
