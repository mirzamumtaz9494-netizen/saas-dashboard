import { Navbar } from "@/components/sections/Navbar"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"
import { Footer } from "@/components/sections/Footer"

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-10">
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
