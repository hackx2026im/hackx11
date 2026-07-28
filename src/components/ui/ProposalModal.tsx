"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProposalModal({ isOpen, onClose }: ProposalModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const templateOptions = [
    {
      title: "Proposal Template Link",
      format: "Google Docs",
      href: "https://docs.google.com/document/d/1lAkOrC6DwFc6FiG9EHGpP5rwHQRj8G3ouRGJN2j6ISo/edit?usp=sharing",
      isExternal: true,
      isPrimary: true,
    },
  ];



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#041A3A]/95 border border-[#5BB8FF]/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(26,111,212,0.25)] backdrop-blur-2xl z-10 my-auto text-white"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#1A6FD4]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#5BB8FF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all"
              aria-label="Close Proposal Modal"
            >
              <X size={20} />
            </button>



            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Proposal Template
            </h3>
            <div className="space-y-3 text-white/75 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                The proposal template is provided as a Google Doc. Please{" "}
                <strong className="font-semibold text-white">make a copy of the template</strong>,
                complete it by following the instructions provided, and{" "}
                <strong className="font-semibold text-white">upload it as a PDF</strong> during the
                proposal submission period.
              </p>
              <p className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-white/85 text-xs sm:text-sm">
                <span className="font-bold text-amber-400">Please note: </span>
                <strong className="font-semibold text-white">
                  Both the proposal document and the pitch video are compulsory to complete your
                  submission.
                </strong>{" "}
                Instructions for preparing and submitting both are included in the template below.
              </p>
            </div>

            {/* Format Options Grid */}
            <div className="space-y-3.5">
              {templateOptions.map((opt, idx) => {
                return (
                  <div
                    key={idx}
                    className={`group relative flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      opt.isPrimary
                        ? "bg-gradient-to-r from-[#1A6FD4]/30 to-[#5BB8FF]/10 border-[#5BB8FF]/40 hover:border-[#5BB8FF]/70"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#1A6FD4]/20 border border-[#5BB8FF]/30 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                        <img src="/Xlogo-favicon.png" alt="hackX Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-semibold text-white truncate">{opt.title}</h4>
                        </div>
                      </div>
                    </div>

                    <a
                      href={opt.href}
                      target={opt.isExternal ? "_blank" : undefined}
                      rel={opt.isExternal ? "noopener noreferrer" : undefined}
                      className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                        opt.isPrimary
                          ? "bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] text-white hover:shadow-[0_0_20px_rgba(91,184,255,0.4)] hover:scale-[1.02]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      <span>{opt.isExternal ? "Open" : "Download"}</span>
                      {opt.isExternal ? <ExternalLink size={15} /> : <Download size={15} />}
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
