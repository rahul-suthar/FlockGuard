// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center relative"
      >
        <h1 className="text-[14rem] sm:text-[24rem] md:text-[34rem] font-black text-slate-200/80 select-none leading-none">
          404
        </h1>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900  tracking-tight">
            Paddock <span className="text-red-500">Not Found</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-xs sm:max-w-md">
            The flock has wandered off or this gate is locked.
          </p>

          <Link
            to="/"
            className="mt-8 px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 hover:scale-105 
            active:scale-95 transition-all shadow-md shadow-red-200 uppercase tracking-widest text-xs sm:text-sm"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
