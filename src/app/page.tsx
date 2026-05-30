"use client";

import Playlist from "@/app/_sections/Playlist";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";
import { PlaylistProvider } from "@/lib/context";
import { Suspense } from "react";
import HeroV2 from "./_sections/HeroV2";

export default function Home() {
  return (
    <PlaylistProvider>
      <main>
        <HeroV2 />

        <MiniMusicPlayer />
      </main>
    </PlaylistProvider>
  );
}
