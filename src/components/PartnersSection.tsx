"use client";

import { motion } from "framer-motion";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

// href omitted for Generation Alpha: official URLs still to be confirmed.
const logos = [
  { src: "/partners-logos/01-ministry.png", href: "https://most.gov.lk", alt: "Ministry of Science & Technology", width: 256, height: 240 },
  { src: "/partners-logos/02-nsf.png", href: "https://www.nsf.gov.lk", alt: "National Science Foundation", width: 1412, height: 562 },
  { src: "/partners-logos/03-evonsys.png", href: "https://www.evonsys.com", alt: "Evonsys", width: 1400, height: 386 },
  { src: "/partners-logos/04-lionbit.png", href: "https://lionbit.cc", alt: "Lionbit", width: 690, height: 230 },
  { src: "/partners-logos/05-nventures.png", href: "https://nventures.sg", alt: "nVentures", width: 1400, height: 317 },
  { src: "/partners-logos/06-generation-alpha.png", alt: "Generation Alpha", width: 1275, height: 418 },
  { src: "/partners-logos/07-slasscom.png", href: "https://slasscom.lk", alt: "SLASSCOM", width: 1400, height: 267 },
  { src: "/partners-logos/08-tie-colombo.png", href: "https://colombo.tie.org", alt: "TiE Colombo", width: 631, height: 719 },
  { src: "/partners-logos/09-virtusa.png", href: "https://www.virtusa.com", alt: "Virtusa", width: 1132, height: 263 },
];

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative w-full bg-brand-black pt-10 pb-12 md:py-20 overflow-hidden z-10"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-brand-sky/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center w-full mb-10 text-center gap-3"
        >
          <span className="eyebrow">Backed By</span>
          <h2 className="whitespace-nowrap text-[clamp(1.5rem,6vw,2.5rem)] md:text-5xl xl:text-6xl font-extrabold title-gradient tracking-tight uppercase">
            Our Partners
          </h2>
          <p className="text-white/55 text-sm md:text-base font-light max-w-xl leading-relaxed">
            Powering Sri Lanka&apos;s next generation of innovators.
          </p>
          <div className="mt-2 h-px w-full max-w-sm bg-gradient-to-r from-transparent via-brand-sky/40 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <LogoCloud logos={logos} />
        </motion.div>
      </div>
    </section>
  );
}
