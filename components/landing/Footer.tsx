"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg w-fit">
              <div className="w-8 h-8 rounded border border-brand-gold flex items-center justify-center">
                <span className="text-brand-gold font-bold text-lg leading-none">G</span>
              </div>
              <span className="text-white font-semibold text-xl">GrandHotel</span>
            </Link>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Top-rated Hospitality SaaS platform used by properties worldwide to streamline operations and enhance guest experiences.
            </p>
            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Office Locations</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/company/contact" className="hover:text-brand-gold transition">New York</Link></li>
                <li><Link href="/company/contact" className="hover:text-brand-gold transition">London</Link></li>
                <li><Link href="/company/contact" className="hover:text-brand-gold transition">Dubai</Link></li>
              </ul>
            </div>
          </div>

          {/* Product (was Features) */}
          <div>
            <h4 className="font-semibold text-white mb-6">Product</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li><Link href="/product/property-management" className="hover:text-brand-gold transition">Property Management</Link></li>
              <li><Link href="/product/guest-check-in" className="hover:text-brand-gold transition">Guest Check-in</Link></li>
              <li><Link href="/product/housekeeping-maintenance" className="hover:text-brand-gold transition">Housekeeping & Maintenance</Link></li>
              <li><Link href="/product/revenue-pricing" className="hover:text-brand-gold transition">Revenue & Pricing</Link></li>
              <li><Link href="/product/analytics-reports" className="hover:text-brand-gold transition">Analytics & Reports</Link></li>
              <li><Link href="/product/staff-scheduler" className="hover:text-brand-gold transition">Staff & Shift Scheduler</Link></li>
              <li><Link href="/product/integrations" className="hover:text-brand-gold transition">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-6">Resources & Help</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li><Link href="/resources/help-center" className="hover:text-brand-gold transition">Help Center</Link></li>
              <li><Link href="/resources/api-docs" className="hover:text-brand-gold transition">API Docs</Link></li>
              <li><Link href="/resources/user-guides" className="hover:text-brand-gold transition">User Guides</Link></li>
              <li><Link href="/company/blog" className="hover:text-brand-gold transition">Blog</Link></li>
              <li><Link href="/resources/community" className="hover:text-brand-gold transition">Community Forum</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for the latest product updates and hospitality insights.</p>
            {subscribed ? (
              <div className="bg-brand-green/20 border border-brand-gold/50 rounded-lg p-4 text-center">
                <p className="text-brand-gold text-sm font-medium">Thanks for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 mb-6 flex flex-col">
                <input 
                  type="email" 
                  required
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-gold text-white"
                />
                <button type="submit" className="w-full bg-white/10 text-white font-medium py-2.5 rounded-lg hover:bg-brand-gold hover:text-brand-darker transition duration-300">
                  Subscribe
                </button>
              </form>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-8">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-xs mt-10 border-t border-white/5 pt-8">
          &copy; {currentYear} GrandHotel Hospitality SaaS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
