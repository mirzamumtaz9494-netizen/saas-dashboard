"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // For decimals, we just handle them in formatting if needed, but here we just use whole numbers
        if (to === 99.9) setCount(99.9);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  // Format comma and decimals
  const displayCount = to === 99.9 ? (count === 99.9 ? "99.9" : count.toFixed(1)) : count.toLocaleString();

  return <span ref={nodeRef}>{displayCount}{suffix}</span>;
}

export function StatsBand() {
  return (
    <section className="py-20 bg-brand-dark border-b border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
        <div>
          <h4 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
            <Counter from={0} to={2000} suffix="+" />
          </h4>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Properties Managed</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl font-bold text-brand-gold mb-2 font-serif">
            <Counter from={0} to={98} suffix="%" />
          </h4>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Faster Check-in</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
            <Counter from={0} to={30} suffix="%" />
          </h4>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Revenue Growth</p>
        </div>
        <div>
          <h4 className="text-4xl md:text-5xl font-bold text-brand-gold mb-2 font-serif">
            <Counter from={0} to={99.9} suffix="%" />
          </h4>
          <p className="text-gray-400 text-sm uppercase tracking-wider">System Uptime</p>
        </div>
      </div>
    </section>
  );
}
