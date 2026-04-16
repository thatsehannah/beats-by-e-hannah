import { Track } from "@/lib/types";
import { adminDb } from "@/lib/firebase/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("beat-metadata")
      .orderBy("createdOn", "desc")
      .get();
    const tracks: Track[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as Track;

      tracks.push({
        id: doc.id,
        title: data.title,
        src: data.src,
        video: data.video,
        sampleSpotifyId: data.sampleSpotifyId,
      });
    });

    return NextResponse.json(tracks);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching tracks", error.stack);
    } else {
      console.log(error);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch track",
      },
      { status: 500 },
    );
  }
}
