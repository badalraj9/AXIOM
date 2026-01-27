import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NeuralBackground from "@/components/canvas/NeuralBackground";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { TransitionProvider } from "@/context/TransitionContext";
import { Wiper } from "@/components/viz/Wiper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AXIOM | Project Portfolio",
  description:
    "Advanced Cognitive Architecture & Systems Engineering Portfolio",
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          jetbrains.variable,
          "font-mono antialiased min-h-screen selection:bg-cyan-500 selection:text-black",
        )}
      >
        <NeuralBackground />

        {/* Grain Overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <TransitionProvider>
          <div className="relative z-10 w-full h-full">{children}</div>
          <CommandPalette />
          <Wiper />
        </TransitionProvider>
      </body>
    </html>
  );
}
