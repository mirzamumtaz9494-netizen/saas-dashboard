"use client";

import { SubPageLayout } from "@/components/landing/SubPageLayout";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    property: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", property: "", message: "" });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <SubPageLayout title="Contact Us" description="Have questions about GrandStay? Our team is here to help you find the right solution for your properties.">
      <div className="max-w-xl mx-auto px-6">
        
        {submitted ? (
          <div className="bg-brand-green/20 border border-brand-gold/30 rounded-2xl p-12 text-center shadow-2xl">
            <div className="w-16 h-16 bg-brand-dark border-2 border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(203,168,100,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
            <p className="text-gray-400">Thank you for reaching out. One of our hospitality experts will get back to you within 24 hours.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-brand-gold hover:text-white transition underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-brand-darker border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name *</label>
              <input 
                id="name" name="name" type="text" required
                value={formData.name} onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition"
                placeholder="Jane Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Work Email *</label>
              <input 
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition"
                placeholder="jane@hotel.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="property" className="text-sm font-medium text-gray-300">Property / Company Name</label>
              <input 
                id="property" name="property" type="text"
                value={formData.property} onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition"
                placeholder="The Azure Boutique"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message *</label>
              <textarea 
                id="message" name="message" required rows={5}
                value={formData.message} onChange={handleChange}
                className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition resize-y"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-gold text-brand-darker font-bold py-4 rounded-xl hover:bg-brand-gold-light transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

      </div>
    </SubPageLayout>
  );
}
