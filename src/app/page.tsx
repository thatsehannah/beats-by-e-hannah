"use client";

import Hero from "@/app/_sections/Hero";
import Playlist from "@/app/_sections/Playlist";
import MiniMusicPlayer from "@/components/MiniMusicPlayer";
import { PlaylistProvider } from "@/lib/context";
import { Suspense } from "react";

export default function Home() {
  return (
    <PlaylistProvider>
      <main>
        <Hero />
        <Suspense>
          <Playlist />
        </Suspense>
        <MiniMusicPlayer />
      </main>
    </PlaylistProvider>
  );
}
