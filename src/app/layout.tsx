import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Big 8 Intergrated, LLC",
  description:
    "Big 8 Intergrated, LLC - industrial equipment, oilfield services, and technology solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
       
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        
        <MotionConfig reducedMotion="user">
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
