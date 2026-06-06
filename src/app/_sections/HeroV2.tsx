"use client";

import { Logo } from "@/components/Logo";
import Marquee from "@/components/Marquee";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import {
  FaThreads as ThreadsIcon,
  FaInstagram as InstagramIcon,
} from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const items = ["Producer out of Georgia", "Sample Enthusiast", "FL Studio"];

const HeroV2 = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      gsap.to(videoRef.current, {
        width: "100vw",
        duration: 4,
        borderRadius: 0,
        position: "sticky",
        top: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.to(mobileVideoRef.current, {
        xPercent: -100,
        duration: 8,
        borderRadius: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 5%",
          scrub: 1.2,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className='h-[80vh] lg:h-screen w-screen'
    >
      <div className='h-full w-full flex flex-col mt-8 xl:items-center  relative'>
        <div className='flex flex-col w-full h-1/3 gap-10'>
          <div className='flex justify-between items-center w-full'>
            <p className='font-semibold text-2xl xl:text-4xl uppercase ml-3 lg:ml-6'>
              Beats by E. Hannah
            </p>
            <div className='flex items-center gap-4 lg:gap-8 mr-3 lg:mr-6'>
              <a
                href='https://instagram.com/thatsehannah'
                target='_blank'
                className='cursor-pointer'
                aria-label="E. Hannah's Instagram account"
              >
                <InstagramIcon className='text-foreground stroke-1 h-5 w-5 lg:h-8 lg:w-8' />
              </a>
              <a
                href='https://threads.com/thatsehannah'
                target='_blank'
                className='cursor-pointer'
                aria-label="E. Hannah's Threads account"
              >
                <ThreadsIcon className='text-foreground stroke-1 h-5 w-5 lg:h-8 lg:w-8' />
              </a>
            </div>
          </div>
          <Marquee
            items={items}
            speed={50}
          />
        </div>
        <video
          ref={videoRef}
          src='/videos/hero2.mp4'
          loop
          muted
          autoPlay
          playsInline
          className='hidden lg:block h-1/2 w-1/2 object-cover z-10 rounded-2xl'
        />
        <video
          ref={mobileVideoRef}
          src='/videos/hero2.mp4'
          loop
          muted
          autoPlay
          playsInline
          className='block lg:hidden w-full object-cover z-10 h-full'
        />
        <div className='w-full items-end mt-auto absolute bottom-0'>
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
