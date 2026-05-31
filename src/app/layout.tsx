import type { Metadata } from "next";
import { Exo_2, Roboto, Nunito, Raleway } from "next/font/google";
import "./globals.css";

const exoFont = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const nunitoFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ralewayFont = Raleway({
  variable: "--font-raleway",
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
      className={`${ralewayFont.variable} antialiased`}
    >
      <body className='font-main'>{children}</body>
    </html>
  );
}
