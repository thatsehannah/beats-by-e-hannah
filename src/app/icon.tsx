import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      tw='bg-foreground w-full h-full flex items-center justify-center rounded-full'
      style={{ backgroundColor: "#4f4d46" }}
    >
      🎹
    </div>,
    {
      ...size,
    },
  );
}
