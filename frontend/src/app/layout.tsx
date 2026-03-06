import type { Metadata } from "next";
import { Fraunces, Fira_Code, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhinav Rana | levelscorner",
  description:
    "From humanoid robots to OTT platforms — backend engineer with 8 years building systems in C++ and Go.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${firaCode.variable} ${dmSans.variable} font-sans min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ChatWidget />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
