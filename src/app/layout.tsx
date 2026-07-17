import type { Metadata } from "next";
import { Outfit, Orbitron } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import BgCanvas from "@/components/BgCanvas";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ViewTransitionsProvider } from "@/components/ViewTransitionsProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KALKI Dynamics | Powering the Next Era.",
  description: "National Defense, Cybernetic AI, Advanced Robotics, Computer Vision & Edge Silicon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#000000] text-[#ffffff] flex flex-col relative w-full overflow-x-hidden selection:bg-[#ea0614] selection:text-white">
        <LoadingScreen />
        <BgCanvas />
        <CustomCursor />
        <ViewTransitionsProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen relative z-10 w-full">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ViewTransitionsProvider>
      </body>
    </html>
  );
}
