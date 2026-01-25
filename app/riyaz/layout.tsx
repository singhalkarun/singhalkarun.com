import type { Metadata } from 'next';
import { RiyazThemeProvider } from '@/app/contexts/RiyazThemeContext';

export const metadata: Metadata = {
  title: 'Riyaz - Sargam Practice Tool',
  description:
    'Practice Indian classical music sargam with an interactive keyboard. Play Sa Re Ga Ma Pa Dha Ni Sa, learn alankars, and improve your riyaz with adjustable tempo and base frequency.',
  keywords: [
    'riyaz',
    'sargam',
    'Indian classical music',
    'sa re ga ma',
    'alankar',
    'music practice',
    'hindustani classical',
    'swar',
    'tanpura',
    'vocal practice',
  ],
  openGraph: {
    title: 'Riyaz - Sargam Practice Tool',
    description:
      'Practice Indian classical music sargam with an interactive keyboard. Learn alankars and improve your riyaz.',
    type: 'website',
    url: 'https://www.singhalkarun.com/riyaz',
    images: [
      {
        url: 'https://www.singhalkarun.com/riyaz.jpeg',
        width: 2282,
        height: 1520,
        alt: 'Riyaz - Sargam Practice Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riyaz - Sargam Practice Tool',
    description:
      'Practice Indian classical music sargam with an interactive keyboard. Learn alankars and improve your riyaz.',
    creator: '@singhalkarun',
    images: ['https://www.singhalkarun.com/riyaz.jpeg'],
  },
};

export default function RiyazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RiyazThemeProvider>{children}</RiyazThemeProvider>;
}
