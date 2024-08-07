import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ModalProvider from '@/providers/Modal-Provider'
import { ToastProvider } from '@/providers/Toast-Provider'
import PaymentModalProvider from "@/providers/Payment-Provider"
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: 'Store',
  description: 'Roselands agri marketers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative px-5 sm:px-10 lg:px-20 h-screen'>
        <ModalProvider />
        <ToastProvider />
        <PaymentModalProvider />
        <Toaster />
        <Navbar/>
        <main  className='h-full'>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
