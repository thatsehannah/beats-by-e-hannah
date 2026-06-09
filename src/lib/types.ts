export type Track = {
  id?: string;
  src: string;
  title: string;
  video: string;
  discogsData: {
    releaseId: string;
    trackPosition: string;
    url: string;
  };
};

export type DiscogsResponse = {
  id: string;
  artist: string;
  trackTitle: string;
  coverImage: string;
};
