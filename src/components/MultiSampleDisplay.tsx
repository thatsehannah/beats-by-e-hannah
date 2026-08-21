"use client";

import { type ClientSampleData } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SingleSampleDisplay from "./SingleSampleDisplay";

interface MultiSampleDisplay {
  data: ClientSampleData[];
}

const MultiSampleDisplay = ({ data }: MultiSampleDisplay) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  return (
    <div className={`flex items-center gap-3 mt-2 mb-4`}>
      <div className='relative lg:w-14 w-12 lg:h-14 h-12'>
        <Image
          src={data[0]?.discogs.coverImage}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          alt='sampled song album cover'
          quality={100}
        />
        {data.length > 1 && (
          <div className='absolute w-8 mx-auto -right-2 -top-1 text-white rounded-full text-center bg-red-400 border border-accent-foreground text-xs'>
            +{data.length}
          </div>
        )}
      </div>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger
          asChild
          className='cursor-pointer'
        >
          <div className='w-full h-fit max-w-[80%] pr-2'>
            <p className='italic text-sm text-white'>
              Multiple samples used.{" "}
              <span className='font-extrabold'>Click</span> to view.
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align='center'
          className='lg:w-full w-[75%] bg-popover-foreground shadow-2xl shadow-black'
        >
          <div className='flex flex-col gap-1'>
            {data.map((sample, index) => (
              <div key={index}>
                <SingleSampleDisplay data={sample} />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSampleDisplay;
