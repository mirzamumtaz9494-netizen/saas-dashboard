"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Solutions", href: "#solutions" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href={siteConfig.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
          >
            Visit Website
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-all shadow-sm"
          >
            Start Your Project
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white py-4 px-4 shadow-lg absolute w-full left-0 top-20">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <Link
              href={siteConfig.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-slate-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Visit Website
            </Link>
            <Link
              href="#contact"
              className="px-5 py-3 rounded-md bg-blue-700 text-white text-center font-medium w-full mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Your Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
