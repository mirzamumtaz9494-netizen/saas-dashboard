"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
    description: "",
    budget: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate an API call abstraction
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-600 via-blue-700 to-indigo-900" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Have an Idea or Business Requirement? <br />
              <span className="text-blue-200">Let's Build It.</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-lg">
              Explain what you need, even if you don't know exactly which technology is required. We'll help determine the right solution.
            </p>
            <div className="space-y-4 pt-8">
              <p className="text-blue-200 font-medium">Or reach us directly at:</p>
              <div className="space-y-2 text-lg">
                <a href={`mailto:${siteConfig.email}`} className="block hover:text-blue-200 transition-colors">{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="block hover:text-blue-200 transition-colors">{siteConfig.phone}</a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-slate-800">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thanks — we've received your enquiry.</h3>
                <p className="text-slate-600">
                  Our team will review your requirement and get back to you shortly.
                </p>
                <Link 
                  href={siteConfig.website}
                  className="mt-4 px-8 py-4 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors block w-full"
                >
                  Visit Teqdeepseek Website
                </Link>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-sm text-slate-500 hover:text-slate-700 underline mt-4"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-slate-700">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="requirement" className="text-sm font-medium text-slate-700">What are you looking to build? *</label>
                  <select 
                    id="requirement" 
                    name="requirement" 
                    required 
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Website">Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile Application</option>
                    <option value="AI Agent">AI Agent / Solution</option>
                    <option value="Custom Software">Custom Software / Automation</option>
                    <option value="Not Sure">Not sure / Need advice</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-slate-700">Project Description *</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    required 
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="Tell us about your business requirement, challenges, and what you want to achieve..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-slate-700">Budget Range (Optional)</label>
                  <select 
                    id="budget" 
                    name="budget" 
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  >
                    <option value="">Select a range</option>
                    <option value="<$10k">Under $10,000</option>
                    <option value="$10k-$50k">$10,000 - $50,000</option>
                    <option value="$50k-$100k">$50,000 - $100,000</option>
                    <option value=">$100k">$100,000+</option>
                  </select>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                    There was an error submitting your request. Please try again or email us directly.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full px-8 py-4 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
