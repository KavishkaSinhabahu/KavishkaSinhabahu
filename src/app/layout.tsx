import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kavishkasinhabahu.com"),
  title: "Kavishka Sinhabahu — Full-Stack Developer & Tech Entrepreneur",
  description:
    "Final-year Software Engineering student at Birmingham City University. Founder of Wideech (Pvt) Ltd — building real products for real clients. Specializing in React, Next.js, Node.js, and React Native.",
  keywords: [
    "Kavishka Sinhabahu",
    "Full-Stack Developer",
    "Software Engineer",
    "Tech Entrepreneur",
    "Wideech",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
  ],
  authors: [{ name: "Kavishka Sinhabahu" }],
  creator: "Kavishka Sinhabahu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kavishkasinhabahu.com",
    siteName: "Kavishka Sinhabahu",
    title: "Kavishka Sinhabahu — Full-Stack Developer & Tech Entrepreneur",
    description:
      "Final-year Software Engineering student at Birmingham City University. Founder of Wideech (Pvt) Ltd — building real products for real clients.",
    images: [
      {
        url: "/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kavishka Sinhabahu — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavishka Sinhabahu — Full-Stack Developer & Tech Entrepreneur",
    description:
      "Final-year Software Engineering student at Birmingham City University. Founder of Wideech (Pvt) Ltd.",
    images: ["/images/og/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Noise Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          <Sidebar />
          <div className="flex min-h-screen flex-col lg:ml-80 relative overflow-x-hidden">
            <main className="flex-1 pt-16 lg:pt-0">{children}</main>
            {/* <Footer /> */}
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
