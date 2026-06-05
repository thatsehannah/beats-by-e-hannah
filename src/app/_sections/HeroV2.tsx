"use client";

import { Logo } from "@/components/Logo";
import Marquee from "@/components/Marquee";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const items = ["Producer out of Georgia", "Sample Enthusiast", "FL Studio"];

const HeroV2 = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      gsap.to(videoRef.current, {
        width: "100vw",
        duration: 2,
        borderRadius: 0,
        position: "sticky",
        top: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 60%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className='h-screen w-screen'
    >
      <div className='h-full w-full flex flex-col mt-8 xl:items-center xl:justify-center'>
        <div className='flex flex-col w-full h-1/3 gap-10'>
          <div className='flex justify-between items-center w-full'>
            <p className='font-semibold text-2xl xl:text-4xl uppercase ml-6'>
              Beats by E. Hannah
            </p>
          </div>
          <Marquee
            items={items}
            speed={50}
          />
        </div>
        <video
          ref={videoRef}
          src='/videos/hero-v2-bg.mp4'
          loop
          muted
          autoPlay
          playsInline
          className='xl:h-1/2 w-full xl:w-1/2 object-cover z-10 rounded-2xl'
        />
        <div className='w-full items-end mt-auto mr-6'>
          <p className='text-lg text-end font-extralight pr-2'>
            Powered by{" "}
            <span className='inline-flex cursor-pointer'>
              <Logo />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
