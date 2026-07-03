import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hackx.lk";
const TITLE = "hackX 11.0 — Sri Lanka's Premier Inter-University Startup Challenge";
const DESCRIPTION =
  "Where university students turn bold ideas into real ventures. Backed by the nation. Built by students. Eleven years running.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "hackX",
    "hackX 11.0",
    "startup challenge",
    "Sri Lanka",
    "inter-university",
    "University of Kelaniya",
    "student startups",
    "entrepreneurship",
  ],
  icons: {
    icon: "/Xlogo-favicon.png",
    shortcut: "/Xlogo-favicon.png",
    apple: "/Xlogo-favicon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "hackX 11.0",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/hackxlogo.webp",
        width: 1200,
        height: 630,
        alt: "hackX 11.0 — Sri Lanka's Premier Inter-University Startup Challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hackxlogo.webp"],
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-black text-white">
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xgq8qj5yrh");
          `}
        </Script>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
