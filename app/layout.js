import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ferboli Móvil',
  description: 'Generated by Ar2Design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor: "#F9FAFB"}}>{children}</body>
    </html>
  )
}
