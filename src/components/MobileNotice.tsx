"use client";

import { useEffect, useState } from "react";
import { Monitor, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check local storage and screen size on mount
    const checkViewport = () => {
      const isMobile = window.innerWidth < 1024; // 1024px covers mobile & tablet
      const isDismissed = localStorage.getItem("hackx-mobile-notice-dismissed") === "true";
      setShowNotice(isMobile && !isDismissed);
    };

    checkViewport();

    // Listen to resize events
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("hackx-mobile-notice-dismissed", "true");
    setShowNotice(false);
  };

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ zIndex: 99999 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-[#041A3A]/45 border border-white/10 backdrop-blur-[32px] rounded-3xl p-8 text-center overflow-hidden shadow-[0_20px_50px_rgba(91,184,255,0.15)]"
          >
            {/* Glow backdrop inside the modal */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#5BB8FF]/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#1A6FD4]/10 blur-3xl rounded-full" />

            {/* Close Icon */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full border border-white/5 bg-white/5 text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>

            {/* Icon Wrapper */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A6FD4]/20 to-[#5BB8FF]/20 border border-[#5BB8FF]/30 flex items-center justify-center mb-6 text-[#5BB8FF]">
              <Monitor size={28} className="animate-pulse" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white tracking-wide uppercase font-sans">
                Desktop View Recommended
              </h3>
            </div>

            {/* Content */}
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              The mobile version of hackX 11.0 is currently under construction. For the best visual experience, immersive animations, and complete detail, please view this website on a <strong>Desktop</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDismiss}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-[#1A6FD4]/20"
              >
                Proceed Anyway
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
