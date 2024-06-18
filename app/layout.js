import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import Header from './dashboard/_components/Header'
import Footer from './dashboard/_components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Interview Recruiter',
  description: 'Created by Patryk Świderski',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <Toaster />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
