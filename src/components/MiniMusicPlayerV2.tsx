"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Rewind } from "lucide-react";
import { usePlaylist } from "@/lib/context";

gsap.registerPlugin(ScrollToPlugin);

const MiniMusicPlayerV2 = () => {
  const { state, dispatch } = usePlaylist();
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: "pause" });
    } else {
      dispatch({ type: "play" });
    }
  };

  const handleNextTrack = () => {
    dispatch({ type: "nextTrack", payload: { playlist: state.playlist } });
  };

  const handlePrevTrack = () => {
    dispatch({ type: "prevTrack", payload: { playlist: state.playlist } });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 400 && state.isPlaying) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (state.playlist.length) {
      setLoading(false);
    }
  }, [state.playlist]);

  if (loading) {
    return;
  }

  return (
    <div
      className={`flex items-center gap-8 lg:p-4 p-3 bg-accent fixed bottom-0 z-50 w-full shadow-2xl ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-all ease-in-out duration-500`}
    >
      <div className='flex items-center justify-around'>
        <Button
          className='text-accent-foreground bg-accent cursor-pointer'
          onClick={handlePrevTrack}
        >
          <Rewind />
        </Button>
        <Button
          className='text-accent-foreground bg-accent cursor-pointer'
          onClick={handlePlayPause}
        >
          {state.isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button
          className='text-accent-foreground bg-accent cursor-pointer'
          onClick={handleNextTrack}
        >
          <FastForward />
        </Button>
      </div>
      <p className='text-sm text-white'>
        Now Playing:{" "}
        <span className='font-bold'>
          {state.playlist[state.currentIndex].title}
        </span>
      </p>
    </div>
  );
};

export default MiniMusicPlayerV2;
