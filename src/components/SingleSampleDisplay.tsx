import { DiscogsResponse, SampleInfo } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface SingleSampleDisplayProps {
  discogsData: DiscogsResponse;
  sampleInfo: SampleInfo;
}

const SingleSampleDisplay = ({
  discogsData,
  sampleInfo,
}: SingleSampleDisplayProps) => {
  return (
    <div className='flex items-center gap-3 mt-2 mb-4'>
      <div className='w-14 h-14 relative'>
        <Image
          src={discogsData.coverImage}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          alt='sampled song album cover'
          quality={100}
        />
      </div>
      <a
        href={sampleInfo.url}
        target='_blank'
        className='italic text-sm text-white line-clamp-1 max-w-[80%] pr-2'
      >
        {`'${discogsData.trackTitle}' by ${discogsData.artist}`}
      </a>
    </div>
  );
};

export default SingleSampleDisplay;
