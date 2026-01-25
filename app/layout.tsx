import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "./contexts/ModeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Karun Agarwal - Software Engineer",
  description: "A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using tech",
  keywords: [
    "Karun Agarwal",
    "Principal Engineer",
    "AI Engineer",
    "Krutrim",
    "OLA",
    "BharatSahAiYak",
    "Kruti AI",
    "Artificial Intelligence",
    "Machine Learning",
    "DevOps",
    "Software Engineer",
    "India",
    "Bengaluru",
    "Founding Engineer",
    "Samagra"
  ],
  authors: [{ name: "Karun Agarwal" }],
  creator: "Karun Agarwal",
  publisher: "Karun Agarwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.singhalkarun.com"),
  alternates: {
    canonical: "/",
  },
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
    creator: "@singhalkarun",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Karun Agarwal" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Riyaz theme initialization - prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('riyaz-theme');
                  if (!theme) return; // Only apply if riyaz theme is set
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var root = document.documentElement;
                  var resolvedTheme = theme === 'dark' || (theme === 'system' && prefersDark)
                    ? 'dark'
                    : 'light';
                  root.classList.remove('light', 'dark');
                  root.classList.add(resolvedTheme);
                  root.setAttribute('data-riyaz-theme', resolvedTheme);
                } catch (e) {}
              })();
            `
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K7QPPZJN9Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K7QPPZJN9Z');
            `
          }}
        />
        
        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Karun Agarwal",
              jobTitle: "Software Engineer & Principal Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Krutrim (OLA)",
                url: "https://www.olakrutrim.com"
              },
              description: "A technology enthusiast who skipped college to pursue his passion for solving real-world complex problems using technology",
              url: "https://www.singhalkarun.com",
              sameAs: [
                "https://github.com/singhalkarun",
                "https://linkedin.com/in/singhalkarun"
              ],
              image: "https://www.singhalkarun.com/profile-photo.jpg"
            })
          }}
        />
        
        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Karun Agarwal",
              url: "https://www.singhalkarun.com",
              description: "Personal website of Karun Agarwal - Software Engineer & AI Enthusiast",
              author: {
                "@type": "Person",
                name: "Karun Agarwal"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ModeProvider>
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
