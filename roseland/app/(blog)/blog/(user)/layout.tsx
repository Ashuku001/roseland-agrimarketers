import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Banner from '../components/Banner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header/>
      <Banner/>
      {children}
    </div>
  )
}