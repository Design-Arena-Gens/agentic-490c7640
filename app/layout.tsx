import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StyleHub - Fashion Lead Generator',
  description: 'Join our exclusive fashion community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
