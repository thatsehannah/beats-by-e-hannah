"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
  items: string[];
  speed?: number; // Lower duration values make it faster
}

export default function Marquee({ items, speed = 50 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!scrollRef.current) return;

      // Clean, seamless linear infinite timeline
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(scrollRef.current, {
        xPercent: -50,
        duration: speed,
        ease: "none",
      });

      // Optional: Smoothly pause and play on hover interactions
      const handleMouseEnter = () =>
        gsap.to(tl, { timeScale: 0, duration: 0.5 });
      const handleMouseLeave = () =>
        gsap.to(tl, { timeScale: 1, duration: 0.5 });

      const container = containerRef.current;
      if (container) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }

      // Cleanup event listeners when component unmounts
      return () => {
        if (container) {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    },
    { scope: containerRef }, // Keeps selectors scoped specifically to this wrapper
  );

  return (
    <div
      ref={containerRef}
      className='w-full overflow-hidden py-6 flex whitespace-nowrap mx-auto'
    >
      {/* Scroll container must hold two identical sets of content to mask the loop point */}
      <div
        ref={scrollRef}
        className='flex gap-12 pr-12 will-change-transform'
      >
        {/* Set 1 */}
        {items.map((item, index) => (
          <>
            <span
              key={`orig-${index}`}
              className='text-primary-foreground text-9xl font-bold uppercase tracking-wider'
            >
              {item}
            </span>
            <span className='text-9xl'> • </span>
          </>
        ))}
        {/* Set 2 (Identical Duplicate) */}
        {items.map((item, index) => (
          <span
            key={`clone-${index}`}
            className='text-primary-foreground text-9xl font-bold uppercase tracking-wider'
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
