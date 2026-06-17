"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import BorderGlow from "@/components/ui/BorderGlow";

/* ─── Event Data ─── */
const events = [
  {
    id: "registrations",
    date: "June 23",
    title: "Registrations Open",
    description:
      "Doors open to universities across Sri Lanka. Free to enter. Just bring an idea worth fighting for.",
    accentColor: "#5BB8FF",
    glowColor: "205 100 68",
    colors: ["#5BB8FF", "#1A6FD4", "#0A3878"],
    imageUrl: "/timeline-images/registration.webp",
  },
  {
    id: "proposal",
    date: "July 31",
    title: "Proposal Submission",
    description:
      "Teams submit structured proposals and a one to two minute product introduction video, screened by industry professionals.",
    accentColor: "#1A6FD4",
    glowColor: "212 78 47",
    colors: ["#1A6FD4", "#5BB8FF", "#0A3878"],
    imageUrl: "/timeline-images/submission.webp",
  },
  {
    id: "designx",
    date: "Sep – Oct",
    title: "designX Workshops",
    description:
      "Four expert-led sessions covering business modelling, startup structuring, and market validation. Exclusive to semi-finalists.",
    accentColor: "#0A3878",
    glowColor: "215 85 26",
    colors: ["#0A3878", "#1A6FD4", "#5BB8FF"],
    imageUrl: "/timeline-images/Workshops.webp",
  },
  {
    id: "ideax",
    date: "October 3",
    title: "ideaX Semi-Finals",
    description:
      "Thirty teams. One stage. Present a working prototype to a panel of expert judges and earn your spot at the Grand Finals.",
    accentColor: "#5BB8FF",
    glowColor: "205 100 68",
    colors: ["#5BB8FF", "#1A6FD4", "#0A3878"],
    imageUrl: "/timeline-images/semifinals.webp",
  },
  {
    id: "finals",
    date: "November 11",
    title: "Grand Finals",
    description:
      "The main event. Finalist teams present fully developed solutions before industry leaders, investors, and government officials.",
    accentColor: "#1A6FD4",
    glowColor: "212 78 47",
    colors: ["#1A6FD4", "#5BB8FF", "#0A3878"],
    imageUrl: "/timeline-images/grandfinals.webp",
  },
];

/* ════════════════════════════════════════════
   START ICON — floating artifact image
   Sits at the very top of the line
   ════════════════════════════════════════════ */
function StartImage({ scrollYProgress }: { scrollYProgress: any }) {
  // Reduced vertical travel to stay anchored to the line
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 45]); // Increased rotation

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center z-20"
      style={{ width: 80, height: 80 }}
    >
      {/* Background plate: completely masks the rail behind the image */}
      <div
        className="absolute rounded-full"
        style={{ width: 60, height: 60, background: "#010814", zIndex: 0 }}
      />
      <motion.img 
        src="/timeline-start.webp" 
        alt="Timeline Start" 
        style={{ y, rotate }}
        className="relative z-10 w-[70px] md:w-[85px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] object-contain" 
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   END ICON — rotating end artifact
   Sits at the very bottom of the line
   ════════════════════════════════════════════ */
function EndImage({ scrollYProgress }: { scrollYProgress: any }) {
  // Continuous smooth rotation across the entire section's scroll length
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center z-20"
      style={{ width: 140, height: 140 }}
    >
      {/* Background plate to mask the end of the timeline rail */}
      <div
        className="absolute rounded-full"
        style={{ width: 80, height: 80, background: "#010814", zIndex: 0 }}
      />
      
      <motion.img 
        src="/timeline-images/endorb.webp"
        alt="Timeline End"
        style={{ rotate }}
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
      />
    </motion.div>
  );
}

/* ─── Individual event row ─── */
function EventRow({
  event,
  index,
  smx,
  smy,
}: {
  event: (typeof events)[0];
  index: number;
  smx: any;
  smy: any;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 80%", "start 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardX = useTransform(scrollYProgress, [0, 1], [isEven ? -40 : 40, 0]);
  const imgX = useTransform(scrollYProgress, [0, 1], [isEven ? 40 : -40, 0]);

  return (
    <div
      ref={rowRef}
      className="relative grid items-center gap-0 py-16 md:py-20"
      style={{ gridTemplateColumns: "1fr 48px 1fr" }}
    >
      {/* ── LEFT ── */}
      <div className="flex justify-end pr-8 md:pr-12">
        {isEven ? (
          <motion.div style={{ opacity, x: cardX }}>
            <GlassCard event={event} />
          </motion.div>
        ) : (
          <motion.div style={{ opacity, x: imgX }} className="w-full flex justify-center max-w-[420px]">
            <EventImage event={event} index={index} rowRef={rowRef} smx={smx} smy={smy} />
          </motion.div>
        )}
      </div>

      {/* ── CENTER dot ── */}
      <div className="flex justify-center items-center relative z-10">
        <motion.div style={{ opacity }}>
          <motion.div
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: event.accentColor }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: event.accentColor }}
              animate={{
                boxShadow: [
                  `0 0 0px 0px ${event.accentColor}00`,
                  `0 0 8px 3px ${event.accentColor}70`,
                  `0 0 0px 0px ${event.accentColor}00`,
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT ── */}
      <div className="flex justify-start pl-8 md:pl-12">
        {isEven ? (
          <motion.div style={{ opacity, x: imgX }} className="w-full flex justify-center max-w-[420px]">
            <EventImage event={event} index={index} rowRef={rowRef} smx={smx} smy={smy} />
          </motion.div>
        ) : (
          <motion.div style={{ opacity, x: cardX }}>
            <GlassCard event={event} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Liquid glass card ─── */
function GlassCard({ event }: { event: (typeof events)[0] }) {
  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor={event.glowColor}
      backgroundColor="rgba(4, 20, 50, 0.45)"
      borderRadius={16}
      glowRadius={30}
      glowIntensity={0.8}
      coneSpread={25}
      animated={false}
      colors={event.colors}
      fillOpacity={0}
      className="w-full max-w-[420px]"
    >
      <div className="relative p-7 overflow-hidden w-full h-full">
        {/* Top refraction line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${event.accentColor}55, transparent)`,
          }}
        />
        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${event.accentColor}12 0%, transparent 70%)`,
          }}
        />

        {/* Date — tight above the title */}
        <div className="mb-2 relative z-10">
          <span
            className="block text-[10px] font-semibold tracking-[0.2em] uppercase select-none"
            style={{ color: event.accentColor, opacity: 0.8 }}
          >
            {event.date}
          </span>
        </div>

        <h3 className="text-white font-extrabold text-xl md:text-2xl tracking-tight leading-tight mb-3 relative z-10">
          {event.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed font-light relative z-10">
          {event.description}
        </p>
      </div>
    </BorderGlow>
  );
}

/* ─── Event floating image ─── */
function EventImage({ event, index, rowRef, smx, smy }: { event: (typeof events)[0]; index: number; rowRef: React.RefObject<HTMLDivElement | null>; smx: any; smy: any }) {
  // Use a full-viewport scroll hook for continuous floating parallax as it moves across screen
  const { scrollYProgress: floatProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Increased scroll reactivity
  const y = useTransform(floatProgress, [0, 1], [100, -100]);
  const rotateRange = index % 2 === 0 ? [-20, 20] : [20, -20];
  const rotate = useTransform(floatProgress, [0, 1], rotateRange);

  // Mouse reactivity
  const mx = useTransform(smx, [-1, 1], index % 2 === 0 ? [-40, 40] : [40, -40]);
  const my = useTransform(smy, [-1, 1], [-40, 40]);

  return (
    <motion.div
      className="relative w-full flex justify-center items-center"
      style={{ y, rotate }}
    >
      <motion.img 
        src={event.imageUrl} 
        alt={event.title} 
        style={{ x: mx, y: my }}
        className="w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)] object-contain max-w-[250px] md:max-w-[320px]" 
      />
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   MAIN SECTION
   ════════════════════════════════════════════ */
export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking logic for interactive floating
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100 };
  const smx = useSpring(mouseX, springConfig);
  const smy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  /* The center column is 48px wide — line is 1px centered within it */
  const lineLeft = "calc(50% - 0.5px)";

  return (
    <section
      id="timeline"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#010814] py-32 overflow-hidden z-10"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px]"
          style={{ background: "rgba(91,184,255,0.03)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black text-white tracking-tight"
          >
            The Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-sm mt-4 tracking-wide"
          >
            Every great venture starts somewhere. Yours starts here.
          </motion.p>
        </div>

        {/* ─── Timeline body ─── */}
        {/*
          Structure:
            [icon row]          ← StartGem, line begins here
            [event rows...]     ← each has its own dot
            [icon row]          ← EndTrophy, line ends here

          The line is absolutely positioned across the full inner block.
          We use padding-top/bottom on the icon rows so the line runs
          edge-to-edge through the center of each icon.
        */}
        <div className="relative" id="timeline-body">

          {/* ── Faint background rail — spans full height of this block ── */}
          <div
            className="absolute top-[24px] bottom-0 w-px pointer-events-none"
            style={{ left: lineLeft, background: "rgba(255,255,255,0.06)" }}
          />

          {/* ── Scroll-filled colored line ── */}
          <div
            className="absolute top-[24px] w-px overflow-hidden pointer-events-none"
            style={{ left: lineLeft, height: "calc(100% - 24px)" }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #5BB8FF 0%, #1A6FD4 100%)",
                boxShadow: "0 0 6px rgba(91,184,255,0.5)",
              }}
            />
          </div>

          {/* ── START IMAGE ── */}
          <div
            className="relative z-20 flex justify-center pb-8 -mt-4"
          >
            <StartImage scrollYProgress={scrollYProgress} />
          </div>

          {/* ── EVENT ROWS ── */}
          {events.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} smx={smx} smy={smy} />
          ))}

          {/* ── END IMAGE ── pushed down; cover strip blocks line below image center ── */}
          <div className="relative z-20 flex justify-center" style={{ paddingTop: 24 }}>
            {/* Downward cover: blocks the rail that bleeds below the center */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: "200px",
                background: "#010814",
                zIndex: 1,
              }}
            />
            <EndImage scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* Bottom blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />
    </section>
  );
}
