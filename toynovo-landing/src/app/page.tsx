import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhatIsToynovo from '@/components/WhatIsToynovo'
import Benefits from '@/components/Benefits'
import HowItWorks from '@/components/HowItWorks'
import ForWhom from '@/components/ForWhom'
import Testimonials from '@/components/Testimonials'
import Impact from '@/components/Impact'
import InterestForm from '@/components/InterestForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhatIsToynovo />
      <Benefits />
      <HowItWorks />
      <ForWhom />
      <Testimonials />
      <Impact />
      <InterestForm />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

