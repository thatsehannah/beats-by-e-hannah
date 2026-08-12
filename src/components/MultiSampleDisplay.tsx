import { DiscogsResponse, SampleInfo } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface MultiSampleDisplay {
  discogsData: DiscogsResponse[];
  sampleInfo: SampleInfo[];
}

const MultiSampleDisplay = ({
  discogsData,
  sampleInfo,
}: MultiSampleDisplay) => {
  return (
    <div className='flex items-center gap-3 mt-2 mb-4'>
      <div className='relative w-15 h-15'>
        {discogsData.map((data, index) => {
          const xOffset = index * 3;
          const yOffset = index * 3;

          return (
            <div
              key={index}
              className={`absolute mx-auto bottom-[${yOffset}px] left-[${xOffset}px]`}
            >
              <div className='w-13 h-13 relative'>
                <Image
                  src={data.coverImage}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  alt='sampled song album cover'
                  quality={100}
                  className={``}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className='w-full h-fit max-w-[80%] pr-2'>
        <p className='italic text-sm text-white'>Multiple samples used</p>
      </div>
    </div>
  );
};

export default MultiSampleDisplay;
