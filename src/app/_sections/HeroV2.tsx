"use client";

import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroV2 = () => {
  return (
    <div className='h-screen'>
      <p>Hero V2</p>
    </div>
  );
};

export default HeroV2;
