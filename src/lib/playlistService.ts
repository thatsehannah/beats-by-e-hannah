import { type DiscogsResponse, type Track } from "./types";

export const getAllTracks = async (): Promise<Track[]> => {
  try {
    const response = await fetch("/api/tracks");
    if (response.ok) {
      const data = await response.json();

      return data;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error in getAllTracks:", error);
    throw error;
  }
};

export const getDiscogsData = async (
  trackId: string,
  position: string,
): Promise<DiscogsResponse> => {
  try {
    const response = await fetch(
      `/api/discogs/${trackId}?position=${position}`,
    );

    if (response.ok) {
      const result = await response.json();

      const formattedArtist = result.artist.replace(/\s*\(\d+\)/, "");
      const formattedResult = {
        ...result,
        artist: formattedArtist,
      };

      return formattedResult;
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error in getDiscogsData", error);
    throw error;
  }
};
