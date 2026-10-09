"use client";

import { SubPageLayout } from "@/components/landing/SubPageLayout";
import { useState } from "react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", property: "", rooms: "1-10", date: "", time: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <SubPageLayout title="Schedule a Demo" description="See exactly how GrandHotel can transform your property operations in a personalized 30-minute walkthrough.">
      <div className="max-w-2xl mx-auto px-6">
        
        {step === 3 ? (
          <div className="bg-brand-green/20 border border-brand-gold/30 rounded-2xl p-12 text-center shadow-2xl">
            <div className="w-16 h-16 bg-brand-dark border-2 border-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(203,168,100,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Demo Scheduled!</h2>
            <p className="text-gray-400 mb-6">We've sent a calendar invitation to {formData.email}</p>
            <div className="bg-brand-darker border border-white/10 p-6 rounded-xl inline-block text-left mb-8">
              <p className="text-white font-medium mb-2 flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-gold"/> {formData.date || "Tomorrow"}</p>
              <p className="text-white font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-brand-gold"/> {formData.time || "10:00 AM EST"}</p>
            </div>
          </div>
        ) : (
          <div className="bg-brand-darker border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-gold text-brand-darker' : 'bg-white/10 text-gray-400'}`}>1</div>
                <span className={`text-sm font-medium ${step >= 1 ? 'text-white' : 'text-gray-400'}`}>Your Details</span>
              </div>
              <div className="flex-1 h-px bg-white/10 mx-4"></div>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-brand-gold text-brand-darker' : 'bg-white/10 text-gray-400'}`}>2</div>
                <span className={`text-sm font-medium ${step >= 2 ? 'text-white' : 'text-gray-400'}`}>Pick a Time</span>
              </div>
            </div>

            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Work Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Property / Company Name</label>
                  <input required name="property" value={formData.property} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Number of Rooms / Units</label>
                  <select name="rooms" value={formData.rooms} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none">
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>200+</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-brand-gold text-brand-darker font-bold py-4 rounded-xl hover:bg-brand-gold-light transition mt-8">Continue</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleConfirm} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select Date</label>
                  <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Select Time</label>
                  <select required name="time" value={formData.time} onChange={handleChange} className="w-full bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none">
                    <option value="">Choose a time</option>
                    <option>10:00 AM EST</option>
                    <option>11:30 AM EST</option>
                    <option>1:00 PM EST</option>
                    <option>3:00 PM EST</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setStep(1)} className="w-1/3 border border-white/20 text-white font-medium py-4 rounded-xl hover:bg-white/5 transition">Back</button>
                  <button type="submit" className="w-2/3 bg-brand-gold text-brand-darker font-bold py-4 rounded-xl hover:bg-brand-gold-light transition">Confirm Booking</button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </SubPageLayout>
  );
}
