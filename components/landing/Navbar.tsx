"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Desktop dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Mobile accordion states
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    {
      title: "Product",
      links: [
        { name: "Overview / Dashboard", href: "/product" },
        { name: "Property Management", href: "/product/property-management" },
        { name: "Guest Check-in", href: "/product/guest-check-in" },
        { name: "Housekeeping & Maintenance", href: "/product/housekeeping-maintenance" },
        { name: "Revenue & Pricing", href: "/product/revenue-pricing" },
        { name: "Analytics & Reports", href: "/product/analytics-reports" },
        { name: "Staff & Shift Scheduler", href: "/product/staff-scheduler" },
        { name: "Integrations", href: "/product/integrations" },
        { name: "What's New", href: "/product/whats-new" },
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "Boutique Hotels", href: "/solutions/boutique-hotels" },
        { name: "Hotel Chains", href: "/solutions/hotel-chains" },
        { name: "Vacation Rentals", href: "/solutions/vacation-rentals" },
        { name: "Serviced Apartments", href: "/solutions/serviced-apartments" },
        { name: "Hostels and B&Bs", href: "/solutions/hostels-bnb" },
        { name: "For Owners", href: "/solutions/owners" },
        { name: "For General Managers", href: "/solutions/general-managers" },
        { name: "For Front Desk", href: "/solutions/front-desk" },
        { name: "For Housekeeping", href: "/solutions/housekeeping" },
      ]
    },
    {
      title: "Pricing",
      href: "/pricing"
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/company/about" },
        { name: "Customers", href: "/company/customers" },
        { name: "Careers", href: "/company/careers" },
        { name: "Blog", href: "/company/blog" },
        { name: "Partners", href: "/company/partners" },
        { name: "Press", href: "/company/press" },
        { name: "Contact", href: "/company/contact" },
      ]
    }
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 top-0 left-0 border-b transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md border-white/10 py-2' : 'bg-transparent border-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded">
              <div className="w-8 h-8 rounded border border-brand-gold flex items-center justify-center">
                <span className="text-brand-gold font-bold text-lg leading-none">G</span>
              </div>
              <span className="text-white font-semibold text-xl tracking-tight">GrandHotel</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item, i) => (
                <div 
                  key={i} 
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.href ? (
                    <Link 
                      href={item.href} 
                      className={`text-sm font-medium transition-colors ${pathname.startsWith(item.href) ? 'text-brand-gold' : 'text-gray-300 hover:text-white'} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded px-2 py-1`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button 
                      className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded px-2 py-1 ${openDropdown === item.title || (item.links && item.links.some(l => pathname === l.href)) ? 'text-brand-gold' : 'text-gray-300 hover:text-white'}`}
                      aria-expanded={openDropdown === item.title}
                      onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                    >
                      {item.title} <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.title ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  {item.links && (
                    <div 
                      className={`absolute top-full left-0 pt-4 w-64 transition-all duration-200 ${openDropdown === item.title ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                    >
                      <div className="bg-brand-darker border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-2 flex flex-col gap-1">
                        {item.links.map((link, j) => (
                          <Link 
                            key={j} 
                            href={link.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`px-4 py-2.5 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${pathname === link.href ? 'bg-brand-gold/10 text-brand-gold font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-brand-gold px-4 py-2 rounded-full border border-white/20 hover:border-brand-gold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
              Sign In
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-brand-gold text-brand-darker px-5 py-2 rounded-full hover:bg-brand-gold-light transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-darker/95 backdrop-blur-xl lg:hidden pt-24 pb-6 px-6 overflow-y-auto border-t border-white/10 flex flex-col h-screen">
          <div className="flex flex-col gap-2 flex-1">
            {navItems.map((item, i) => (
              <div key={i} className="border-b border-white/5 last:border-0 pb-2">
                {item.href ? (
                  <Link 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-lg font-medium text-white"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <div>
                    <button 
                      onClick={() => toggleMobileDropdown(item.title)}
                      className="w-full py-4 flex items-center justify-between text-lg font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
                    >
                      {item.title}
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileDropdowns[item.title] ? 'rotate-180 text-brand-gold' : 'text-gray-500'}`} />
                    </button>
                    {mobileDropdowns[item.title] && (
                      <div className="flex flex-col gap-2 pb-4 pl-4 border-l border-white/10 ml-2">
                        {item.links?.map((link, j) => (
                          <Link 
                            key={j} 
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`py-2 text-sm ${pathname === link.href ? 'text-brand-gold font-medium' : 'text-gray-400'}`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center text-sm font-medium text-white px-4 py-3 rounded-xl border border-white/20 hover:border-brand-gold transition">
              Sign In
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full text-center text-sm font-medium bg-brand-gold text-brand-darker px-5 py-3 rounded-xl hover:bg-brand-gold-light transition font-bold">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
