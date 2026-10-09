"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long is the free trial?",
    answer: "We offer a 14-day full-featured free trial. No credit card is required to sign up, and you can test all premium features including channel syncing and automated messaging."
  },
  {
    question: "Will you help with data migration?",
    answer: "Yes! Our onboarding team will help you migrate your existing reservations, guest profiles, and room setups from your previous software completely free of charge."
  },
  {
    question: "How secure is my guest data?",
    answer: "Security is our top priority. We are SOC 2 Type II compliant, fully GDPR compliant, and all data is encrypted both in transit and at rest using banking-grade AES-256 encryption."
  },
  {
    question: "Can I cancel at any time?",
    answer: "Absolutely. We don't believe in locking you in. Our Starter and Professional plans are month-to-month, and you can cancel anytime with a single click."
  },
  {
    question: "What integrations do you support?",
    answer: "We support over 50 native integrations including PayGateway, GlobalOTA, VacationRentals, TravelNet, CloudBooks, AcctPlus, Salto smart locks, and Mailchimp. We also offer an open API for custom connections."
  },
  {
    question: "Is there a limit on the number of users?",
    answer: "No. All of our plans include unlimited staff user accounts. You can set custom permission levels for managers, front desk, and housekeeping staff without paying extra."
  },
  {
    question: "What are your support hours?",
    answer: "We offer 24/7 global support for our Professional and Enterprise customers. Starter plans receive priority email support during business hours (EST/GMT)."
  },
  {
    question: "Do you offer custom pricing for large portfolios?",
    answer: "Yes, our Enterprise plan is designed for large hotel groups and property managers with 20+ properties. Contact our sales team for volume discounts and custom SLA agreements."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-brand-dark">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Everything you need to know about switching to GrandHotel.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white/5' : 'bg-transparent'}`}
            >
              <button 
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-brand-gold' : ''}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
