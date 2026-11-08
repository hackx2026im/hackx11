"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

// ── Event config ──────────────────────────────────────────────
const EVENT_START = new Date("2026-11-11T09:00:00+05:30").getTime();
const HIDE_AFTER = new Date("2026-11-11T23:59:59+05:30").getTime();
const SHOW_DELAY_MS = 2600; // preloader (1.5s) + a beat of hero
const SEEN_KEY = "hackx11-grandfinals-seen";
const VIMEO_ID = 1203805610; // same video as the "What is hackX" section
const CLIP_START = 0;
const CLIP_END = 12; // seconds — loop just a short teaser
const VIDEO_GIVE_UP_MS = 9000; // if it hasn't started by then, keep the poster

// Title-sequence beats (ms on screen). After the last one, the final reveal holds.
const BEATS = [1100, 1300, 1100, 1300];
const EASE = [0.16, 1, 0.3, 1] as const;

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
    live: diff === 0,
  };
}

function isSlowConnection() {
  try {
    const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!c) return false;
    return !!c.saveData || /(^|-)2g$/.test(c.effectiveType || "");
  } catch {
    return false;
  }
}

/** Full-bleed muted teaser. Preloads during the title beats; poster covers any gap. */
function TeaserVideo({ show }: { show: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [poster, setPoster] = useState("");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${VIMEO_ID}&width=1280`)
      .then((r) => r.json())
      .then((d) => d.thumbnail_url && setPoster(d.thumbnail_url))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isSlowConnection() || !hostRef.current) return;
    let player: import("@vimeo/player").default | null = null;
    let cancelled = false;
    let giveUp: ReturnType<typeof setTimeout>;

    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled || !hostRef.current) return;
      player = new Player(hostRef.current, {
        id: VIMEO_ID,
        background: true,
        muted: true,
        dnt: true,
        quality: "540p",
      });
      giveUp = setTimeout(() => {
        player?.destroy().catch(() => {});
        player = null;
      }, VIDEO_GIVE_UP_MS);
      player.on("playing", () => {
        clearTimeout(giveUp);
        setPlaying(true);
      });
      player.on("timeupdate", ({ seconds }: { seconds: number }) => {
        if (seconds >= CLIP_END) player?.setCurrentTime(CLIP_START).catch(() => {});
      });
      if (CLIP_START) player.setCurrentTime(CLIP_START).catch(() => {});
    });

    return () => {
      cancelled = true;
      clearTimeout(giveUp);
      player?.destroy().catch(() => {});
    };
  }, []);

  return (
    <motion.div
      className="gf-video"
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 1.06 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {poster && <img src={poster} alt="" className="gf-poster" />}
      <div ref={hostRef} className="gf-vimeo" style={{ visibility: playing ? "visible" : "hidden" }} />
      <div className="gf-legibility" />
    </motion.div>
  );
}

/** Masked line reveal — transform-only, so nothing reflows. */
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="gf-mask">
      <motion.span
        className="gf-line"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-105%", transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Beat({ lines, className }: { lines: React.ReactNode[]; className: string }) {
  return (
    <motion.div className={`gf-beat ${className}`} exit={{ transition: { duration: 0.35 } }}>
      {lines.map((l, i) => (
        <Line key={i} delay={i * 0.08}>
          {l}
        </Line>
      ))}
    </motion.div>
  );
}

export default function GrandFinalsPopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const final = step >= BEATS.length;

  useEffect(() => {
    if (Date.now() > HIDE_AFTER) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Advance the title sequence
  useEffect(() => {
    if (!open || final) return;
    if (reduce) {
      setStep(BEATS.length);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), BEATS[step]);
    return () => clearTimeout(t);
  }, [open, step, final, reduce]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  // Lock scroll + Esc to close
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, close]);

  const c = useCountdown(EVENT_START);
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gf"
          role="dialog"
          aria-modal="true"
          aria-label="hackX 11.0 Grand Finals — 11th November at Waters Edge"
          className="gf-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          transition={{ duration: 0.5 }}
        >
          <div className="gf-abyss" />

          <TeaserVideo show={final} />

          {/* Cinematic letterbox */}
          <motion.div className="gf-bar gf-bar-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: EASE }} />
          <motion.div className="gf-bar gf-bar-bot" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.7, ease: EASE }} />

          {/* Title beats */}
          <div className="gf-center">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <Beat key="b0" className="gf-kicker" lines={["Sri Lanka’s Premier"]} />
              )}
              {step === 1 && (
                <Beat key="b1" className="gf-headline" lines={["Inter-University", "Startup Challenge"]} />
              )}
              {step === 2 && (
                <motion.img
                  key="b2"
                  src="/hackxlogo.webp"
                  alt="hackX 11.0"
                  className="gf-logo-big"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              )}
              {step === 3 && (
                <Beat key="b3" className="gf-headline gf-huge" lines={["The Grand Finals"]} />
              )}
            </AnimatePresence>
          </div>

          {/* Final reveal */}
          {final && (
            <div className="gf-final">
              <motion.img src="/hackxlogo.webp" alt="hackX 11.0" className="gf-logo-sm" {...rise(0.05)} />
              <p className="gf-eyebrow">
                <Line delay={0.15}>The Grand Finals, Happening At</Line>
              </p>
              <h2 className="gf-venue">
                <Line delay={0.25}>Waters Edge</Line>
              </h2>
              <motion.p className="gf-when" {...rise(0.5)}>
                11 November 2026 <span>·</span> 9 AM Onwards
              </motion.p>

              <motion.div className="gf-countdown" {...rise(0.62)}>
                {c.live ? (
                  <span className="gf-live">● Happening Now</span>
                ) : (
                  (
                    [
                      ["Days", c.d],
                      ["Hrs", c.h],
                      ["Min", c.m],
                      ["Sec", c.s],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k} className="gf-cd">
                      <span>{String(v).padStart(2, "0")}</span>
                      <small>{k}</small>
                    </div>
                  ))
                )}
              </motion.div>

              <motion.div {...rise(0.74)}>
                <button
                  className="btn-primary w-full max-w-[260px] sm:w-[245px] h-[50px] px-5 flex items-center justify-center text-[14px] sm:text-[15px] font-semibold whitespace-nowrap gap-2 shrink-0 cursor-pointer"
                  onClick={close}
                >
                  <span>Dive In</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </div>
          )}

          {!final && (
            <button className="gf-skip" onClick={() => setStep(BEATS.length)}>
              Skip
            </button>
          )}
          <button className="gf-close" onClick={close} aria-label="Close">
            ×
          </button>

          <style>{css}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const css = `
.gf-root{position:fixed;inset:0;z-index:9999;overflow:hidden;font-family:'TT Hoves Pro',system-ui,sans-serif;color:#fff;background:#010814}
.gf-abyss{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#061733 0%,#020b1c 55%,#010814 100%)}

.gf-video{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.gf-poster{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.gf-vimeo{position:absolute;inset:0}
.gf-vimeo iframe{position:absolute;top:50%;left:50%;width:max(100vw,177.78vh);height:max(100vh,56.25vw);transform:translate(-50%,-50%);border:0}
.gf-legibility{position:absolute;inset:0;background:linear-gradient(180deg,rgba(1,8,20,.15) 0%,transparent 30%,rgba(1,8,20,.55) 62%,rgba(1,8,20,.92) 100%)}

.gf-bar{position:absolute;left:0;right:0;height:clamp(28px,7vh,72px);background:#000;z-index:3}
.gf-bar-top{top:0;transform-origin:top}
.gf-bar-bot{bottom:0;transform-origin:bottom}

.gf-center{position:absolute;inset:0;z-index:4;display:grid;place-items:center;padding:0 20px;text-align:center;pointer-events:none}
.gf-beat{display:flex;flex-direction:column;align-items:center;font-family:'TT Hoves Pro',system-ui,sans-serif;font-weight:600;line-height:1.05;letter-spacing:-0.02em;color:#fff}
.gf-mask{display:block;overflow:hidden;padding:.06em 0 .12em}
.gf-line{display:block;will-change:transform}
.gf-kicker{font-weight:300;font-size:clamp(1.6rem,4.5vw,3.4rem);color:rgba(255,255,255,.8)}
.gf-headline{font-size:clamp(2rem,7vw,5.6rem)}
.gf-huge{font-size:clamp(2.6rem,9vw,7.5rem)}
.gf-logo-big{width:clamp(200px,34vw,440px);height:auto}

.gf-final{position:absolute;left:0;right:0;bottom:clamp(40px,10vh,110px);z-index:4;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 20px}
.gf-logo-sm{width:clamp(96px,10vw,130px);height:auto;margin-bottom:12px}
.gf-eyebrow{margin:0 0 2px;font-size:clamp(14px,1.5vw,18px);font-weight:300;color:rgba(255,255,255,.75)}
.gf-venue{margin:0;font-family:'TT Hoves Pro',system-ui,sans-serif;font-weight:600;line-height:1;letter-spacing:-0.03em;
  font-size:clamp(3rem,10vw,8rem);color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.5)}
.gf-when{margin:12px 0 20px;font-size:clamp(1rem,1.8vw,1.3rem);font-weight:400;color:rgba(255,255,255,.85)}
.gf-when span{color:#5BB8FF;margin:0 .4em}
.gf-countdown{display:flex;gap:10px;margin-bottom:22px}
.gf-cd{min-width:60px;padding:8px 6px;text-align:center;border-radius:14px;background:rgba(1,8,20,.55);border:1px solid rgba(91,184,255,.25);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.gf-cd span{display:block;font-size:1.35rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}
.gf-cd small{font-size:11px;color:rgba(255,255,255,.6)}
.gf-live{color:#5BB8FF;font-weight:600}

.gf-skip{position:absolute;z-index:5;right:20px;bottom:calc(clamp(28px,7vh,72px) + 14px);padding:8px 18px;border-radius:999px;font-size:13px;
  color:rgba(255,255,255,.75);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);cursor:pointer}
.gf-close{position:absolute;z-index:5;top:calc(clamp(28px,7vh,72px) + 12px);right:16px;width:38px;height:38px;border-radius:50%;font-size:22px;line-height:1;color:#fff;
  background:rgba(1,8,20,.4);border:1px solid rgba(255,255,255,.2);cursor:pointer}
.gf-skip:hover,.gf-close:hover{background:rgba(255,255,255,.15)}

@media (max-width:767px){
  .gf-final{bottom:calc(clamp(28px,7vh,72px) + 20px)}
  .gf-when{margin:10px 0 16px}
  .gf-countdown{gap:8px;margin-bottom:18px}
  .gf-cd{min-width:54px}
}
`;
