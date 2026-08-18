import { type ClientSampleData } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface SingleSampleDisplayProps {
  data: ClientSampleData;
}

const SingleSampleDisplay = ({ data }: SingleSampleDisplayProps) => {
  return (
    <div className='flex items-center gap-3 mt-2 mb-4'>
      <div className='lg:w-14 w-12 lg:h-14 h-12 relative'>
        <Image
          src={data.discogs.coverImage}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          alt='sampled song album cover'
          quality={100}
        />
      </div>
      <a
        href={data.sample.url}
        target='_blank'
        className='italic text-sm text-white line-clamp-1 max-w-[80%] pr-2'
      >
        {`'${data.discogs.trackTitle}' by ${data.discogs.artist}`}
      </a>
    </div>
  );
};

export default SingleSampleDisplay;
