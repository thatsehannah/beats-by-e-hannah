"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "react-responsive";
import { ChevronDown, Vault } from "lucide-react";
import Logo from "../../../public/images/new-beats-logo.svg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  const maskSize = isMobile ? "36%" : isTablet ? "43%" : "32%";

  //First value: horizontal position. Second value: vertical position
  const maskPosition = "97% 50%";

  useGSAP(() => {
    const maskTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: 1,
        pin: true,
      },
    });

    maskTimeLine
      .to(".hero-instructions", {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(bgVideoRef.current, {
        scale: 1,
        maskSize: maskSize,
        maskPosition: maskPosition,
        duration: 8,
        ease: "power1.inOut",
      })
      .to(".logo", {
        opacity: 1,
        duration: 2.2,
        ease: "power1.inOut",
      })
      .fromTo(
        ".subtitle",
        {
          yPercent: -100,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 4,
          ease: "power1.inOut",
        },
      )
      .to(".call-to-action", {
        opacity: 1,
        ease: "expo.out",
        duration: 4,
      });
  });

  const scrollToPlaylist = () => {
    gsap.to(window, {
      duration: 2,
      scrollTo: "#playlist",
      ease: "power2.inOut",
    });
  };

  const spinVault = () => {
    gsap.to(".vault", {
      duration: 1,
      rotation: "+=180",
    });
  };

  return (
    <section className='w-screen h-screen relative hero bg-background'>
      <video
        ref={bgVideoRef}
        src='/videos/hero-bg.mp4'
        autoPlay
        loop
        muted
        className='h-full w-full object-cover z-10 brightness-50 masked-img'
        preload='metadata'
        playsInline
        webkit-playsinline='true'
      />
      <div className='z-50 absolute top-[50%] lg:top-10 w-full flex flex-col justify-center items-center gap-1 text-white hero-instructions'>
        <p>Scroll Down To Continue</p>
        <ChevronDown className='animate-pulse' />
      </div>
      <div className='absolute z-50 xl:top-[6%] lg:top-[20%] lg:bottom-[14%] md:bottom-[32%] bottom-[36%] 2xl:left-[24rem] xl:left-[18rem] lg:left-40 md:left-18 left-[7%] w-auto flex flex-col justify-center items-center'>
        <div className='relative opacity-0 logo'>
          <Logo className='lg:h-100 md:h-70 h-42 w-auto fill-accent' />
        </div>
        <div className='flex flex-col md:gap-8 gap-3 mt-7'>
          <p className='subtitle md:text-center lg:text-2xl md:text-lg text-sm font-light uppercase opacity-0'>
            Sample-chopping Hobbyist
          </p>
          <div className='call-to-action flex justify-center items-center opacity-0'>
            <Button
              className='md:p-8 p-6 cursor-pointer hover:scale-110 hover:shadow-lg ease-in-out transition-all duration-500 flex gap-2 items-center justify-center'
              onClick={() => {
                scrollToPlaylist();
                spinVault();
              }}
            >
              <div className='flex justify-center items-center md:gap-4 gap-3'>
                <p className='md:text-xl text-sm font-bold uppercase'>
                  open the vault
                </p>
                <Vault className='vault md:scale-200 scale-150' />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
