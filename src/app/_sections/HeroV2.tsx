"use client";

import { Logo } from "@/components/Logo";
import Marquee from "@/components/Marquee";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const items = ["Producer out of Georgia", "Sample Enthusiast", "FL Studio"];

const HeroV2 = () => {
  return (
    <div className='h-screen w-screen px-10'>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='flex flex-col w-full h-1/3 justify-evenly'>
          <div className='flex justify-between w-full'>
            <p className='font-black text-5xl uppercase'>Beats by E. Hannah</p>
            <p className='text-4xl font-extralight'>
              Powered by{" "}
              <span className='inline-flex cursor-pointer'>
                <Logo />
              </span>
            </p>
          </div>
          <Marquee
            items={items}
            speed={25}
          />
        </div>
        <video
          src='/videos/hero-v2-bg.mp4'
          loop
          muted
          autoPlay
          playsInline
          className='h-1/2 w-1/2 object-cover z-10 rounded-2xl'
        />
      </div>
    </div>
  );
};

export default HeroV2;
