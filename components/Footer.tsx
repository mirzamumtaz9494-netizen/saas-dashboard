import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {siteConfig.name}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
              <Link href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Website Development</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Web Applications</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Mobile Applications</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">AI Agents</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Custom AI Solutions</Link></li>
              <li><Link href="#services" className="hover:text-blue-400 transition-colors">Business Automation</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href={siteConfig.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Official Website</Link></li>
              <li><Link href="#process" className="hover:text-blue-400 transition-colors">How We Work</Link></li>
              <li><Link href="#why-us" className="hover:text-blue-400 transition-colors">Why Choose Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for scalable business growth.</p>
        </div>
      </div>
    </footer>
  );
}
