import type { Metadata } from 'next'
import { Inter, DM_Serif_Display, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({ 
  subsets: ["latin"],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: '400',
})

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Proactive Painting — Raymond Gil · Bay Area Painting Since 2018',
  description: "Hi, I'm Raymond Gil. My wife Patty and I have been running Proactive Painting since 2018. Interior, exterior, and residential painting in the Bay Area. Licensed CSLB C-33.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#f8f3e9]">
      <body className={`${inter.variable} ${dmSerifDisplay.variable} ${instrumentSans.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
