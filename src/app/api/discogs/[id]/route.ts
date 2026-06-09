import { DiscogsResponse } from "@/lib/types";
import { NextResponse } from "next/server";

const TOKEN = process.env.DISCOGS_TOKEN;
const BASE_URL = "https://api.discogs.com";

const USER_AGENT = "BeatsByEHannah/1.0 +https://beatsbyehannah.xyz";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const position = searchParams.get("position");

  const res = await fetch(`${BASE_URL}/releases/${id}`, {
    headers: {
      Authorization: `Discogs token=${TOKEN}`,
      "User-Agent": USER_AGENT,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({
      error: "Discogs API error",
      status: res.status,
    });
  }

  const data = await res.json();
  let artist = "";

  if (data.artists?.length > 1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artist = data.artists?.map((a: any) => a.name).join(" / ");
  } else {
    artist = data.artists[0]?.name;
  }

  const results: DiscogsResponse = {
    id: data.id,
    artist: artist,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackTitle: data.tracklist?.find((i: any) => i.position === position)
      ?.title,
    coverImage: data.images[0]?.uri,
  };

  return NextResponse.json(results);
};
