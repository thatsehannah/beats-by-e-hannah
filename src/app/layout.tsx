import type { Metadata } from "next";
import { Manrope, Tektur } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const tektur = Tektur({
  variable: "--font-tektur",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beats by E. Hannah",
  description: "Beat making hobbyist",
  icons: {
    icon: "../icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
      className={`${manrope.variable} ${tektur.variable} antialiased`}
    >
      <body className='font-main'>{children}</body>
    </html>
  );
}
