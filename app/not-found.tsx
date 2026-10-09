import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-brand-dark min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-brand-gold font-bold text-9xl mb-6 font-serif italic">404</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Page Not Found</h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-brand-gold text-brand-darker font-medium px-8 py-3.5 rounded-full hover:bg-brand-gold-light transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
