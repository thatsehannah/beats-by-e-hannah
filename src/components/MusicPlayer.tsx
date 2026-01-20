"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { FastForward, Pause, Play, Redo2, Rewind } from "lucide-react";
import gsap from "gsap";
import { usePlaylist } from "@/lib/context";
import { SpotifyTrack, Track } from "@/lib/types";
import Image from "next/image";
import { getSpotifyTrack } from "@/lib/playlistService";

//TODO: keep track of number of plays for each beat
//TODO: add like and dislike buttons to media player for each beat

const MusicPlayer = () => {
  const { state, dispatch } = usePlaylist();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sampleSpotifyData, setSampleSpotifyData] = useState<SpotifyTrack>({
    name: "",
    trackUri: "",
    albumCoverUrl: "",
    artist: "",
  });
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist: Track[] = state.playlist;
  const currentTrack: Track = playlist[state.currentIndex];

  const formatDuration = (input: number) => {
    const minutes = Math.floor(input / 60);
    const seconds = Math.floor(input % 60);

    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekedTime = parseInt(e.target.value);
      audioRef.current.currentTime = seekedTime;
      setCurrentTime(seekedTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleNextTrack = () => {
    dispatch({ type: "seeked" });
    dispatch({ type: "nextTrack", payload: { playlist } });
  };

  const handlePrevTrack = () => {
    dispatch({ type: "seeked" });
    dispatch({ type: "prevTrack", payload: { playlist } });
  };

  const handlePlayPause = () => {
    if (state.isPlaying) {
      dispatch({ type: "pause" });
      audioRef.current?.pause();
    } else {
      dispatch({ type: "play" });
      audioRef.current?.play();
    }
  };

  const toggleFlip = () => {
    setShowPlaylist((prevState) => !prevState);

    gsap.to(".player-card", {
      rotateY: showPlaylist ? 0 : 180,
      ease: "power2.inOut",
      duration: 0.4,
    });
  };

  //getting sample data
  useEffect(() => {
    if (currentTrack && currentTrack.sampleSpotifyId !== "undefined") {
      const fetchSample = async () => {
        try {
          const response = await getSpotifyTrack(currentTrack.sampleSpotifyId);
          setSampleSpotifyData(response);
        } catch (error) {
          console.log(error);
        }
      };

      fetchSample();
    }
  }, [currentTrack]);

  //this useEffect will listen for 'timeupdate' events
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  //if a new track loads and "isPlaying" is still true, start it automatically
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (state.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentTrack, state.isPlaying]);

  //this useEffect plays the next beat when the current beat ends
  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (audio.ended) {
        dispatch({ type: "nextTrack", payload: { playlist } });
      }
    }
  }, [dispatch, playlist, audioRef.current?.ended]);

  //this useEffect is for setting the metadata and various device controls (headphones, keyboard, etc.) for the beats
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${currentTrack.title} • Beats By E. Hannah`,
        artwork: [{ src: "/images/new-beats-logo.png" }],
      });
      navigator.mediaSession.setActionHandler("play", handlePlayPause);
      navigator.mediaSession.setActionHandler("pause", handlePlayPause);
      navigator.mediaSession.setActionHandler("nexttrack", handleNextTrack);
      navigator.mediaSession.setActionHandler("previoustrack", handlePrevTrack);
    }
  });

  return (
    <div
      className={`relative md:w-96 w-76 h-65 rounded-xl text-foreground shadow-2xl ${
        state.isPlaying
          ? "shadow-none bg-background/50"
          : "shadow-white bg-background"
      } ease-in-out duration-700 player-card perspective-distant transform-3d`}
    >
      {/* front of music player */}
      <div className='absolute w-full h-full backface-hidden p-4'>
        <p
          className='font-semibold hover:cursor-pointer w-fit text-lg'
          onClick={toggleFlip}
        >
          {currentTrack.title}
        </p>

        {currentTrack.sampleSpotifyId !== "undefined" ? (
          <div className='flex items-center gap-3 mt-2 mb-4 '>
            {sampleSpotifyData?.albumCoverUrl && (
              <div className='w-8 h-8 relative'>
                <Image
                  src={sampleSpotifyData.albumCoverUrl}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  alt='sampled song album cover'
                  quality={100}
                />
              </div>
            )}
            {sampleSpotifyData?.trackUri && (
              <a
                href={sampleSpotifyData!.trackUri}
                target='_blank'
                className='italic text-sm'
              >
                {`'${sampleSpotifyData.name}' by ${sampleSpotifyData.artist}`}
              </a>
            )}
          </div>
        ) : (
          <div className='mt-2 mb-4'>
            <p className='italic text-sm'>
              No identifiable sample information for this beat.
            </p>
          </div>
        )}

        <input
          type='range'
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className='w-full h-[5px] accent-accent'
        />
        <audio
          ref={audioRef}
          src={currentTrack.src}
          preload='metadata'
        />
        <div className='flex items-center justify-between mt-2 text-sm'>
          <p>{formatDuration(currentTime)}</p>
          <p>{formatDuration(duration || 0)}</p>
        </div>
        <div className='flex items-center justify-around mt-8'>
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
      </div>
      {/* back of music player */}
      <div className='absolute w-full h-full backface-hidden rotate-y-180 p-4 overflow-scroll'>
        <div className='flex justify-between'>
          <p className='text-2xl mb-4 font-extrabold uppercase'>Beats</p>
          <Redo2
            onClick={toggleFlip}
            size={18}
            className='cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out'
          />
        </div>
        {playlist.map((track, index) => {
          return (
            <div
              key={index}
              className={`cursor-pointer my-2 p-2 border-b-2 flex items-center justify-center ${
                currentTrack.title === track.title
                  ? "bg-amber-100 font-bold text-shadow-2xs"
                  : "font-light"
              } hover:scale-105 transition-transform duration-300 ease-in-out`}
            >
              <p
                onClick={() => {
                  toggleFlip();
                  dispatch({ type: "selectTrack", payload: { index } });
                  dispatch({ type: "play" });
                }}
              >
                {track.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicPlayer;
