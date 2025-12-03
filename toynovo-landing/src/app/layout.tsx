import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Toynovo - Alquiler de Juguetes para Bebés | Economía Circular',
  description: 'Alquila juguetes para tu bebé con Toynovo. Servicio de economía circular para familias, colegios y jardines de infancia. Sostenible y económico.',
  keywords: 'alquiler juguetes bebé, economía circular, juguetes sostenibles, juguetes segunda mano',
  openGraph: {
    title: 'Toynovo - Alquiler de Juguetes para Bebés',
    description: 'Servicio de economía circular para familias conscientes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

