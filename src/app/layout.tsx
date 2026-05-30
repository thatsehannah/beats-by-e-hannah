import type { Metadata } from "next";
import { Exo_2, Roboto } from "next/font/google";
import "./globals.css";

const exoFont = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  variable: "--font-roboto",
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
      className={`${robotoFont.variable} antialiased`}
    >
      <body className='font-main'>{children}</body>
    </html>
  );
}
