import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Karun Agarwal",
  description: "A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech",
  openGraph: {
    title: "Karun Agarwal",
    description: "A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech",
    url: "https://www.singhalkarun.com",
    siteName: "Karun Agarwal",
    images: [
      {
        url: "/profile-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Karun Agarwal - Software Engineer and Pet Parent",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karun Agarwal",
    description: "A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech",
    images: ["/profile-photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
