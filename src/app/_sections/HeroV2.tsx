"use client";

import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import React, { Suspense, useEffect, useRef } from "react";
import Playlist from "./Playlist";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroV2 = () => {
  const bgVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = bgVideo.current;
    if (!video) return;

    video.play();
  }, []);

  return (
    <section className='w-screen h-screen relative'>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center w-full px-12'>
          <p className='text-6xl font-bold z-60 mt-6'>Beats By E. Hannah</p>
        </div>
        <div className=''>
          <Suspense>
            <Playlist />
          </Suspense>
        </div>
      </div>
      <div className=''>
        <video
          ref={bgVideo}
          src='/videos/hero-v2-bg.mp4'
          loop
          muted
          height='100%'
          width='100%'
          preload='none'
          className='top-0 size-full object-cover absolute z-50'
        />
      </div>
    </section>
  );
};

export default HeroV2;
