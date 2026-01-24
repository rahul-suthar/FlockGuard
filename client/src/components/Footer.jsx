import React from "react";
import { Link } from "react-router-dom";

const legalLinks = [
  { name: "Privacy Policy", url: "/privacy-policy" },
  { name: "Terms of Service", url: "/terms-of-service" },
];

function Footer() {
  return (
    <footer className="w-full py-6 sm:py-8 mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center md:items-end gap-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg sm:text-2xl font-black text-red-500 tracking-tighter uppercase">
            FlockGuard
          </span>
          <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-[8px] sm:text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] opacity-60">
            Legal Documentation
          </h3>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            {legalLinks.map((p) => (
              <Link
                key={p.url}
                to={p.url}
                className="text-[10px] sm:text-xs font-bold text-slate-600 hover:text-red-500 tracking-wide transition-all md:hover:-translate-y-1"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
