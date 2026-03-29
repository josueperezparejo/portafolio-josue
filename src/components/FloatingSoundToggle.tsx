import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const AMBIENT_SRC = "/Halo.mp3";
const TARGET_VOL  = 0.22;   // comfortable ambient level
const FADE_MS     = 1800;   // fade-in duration

export default function FloatingSoundToggle({
  visible,
}: {
  visible: boolean;
}) {
  const [soundOn, setSoundOn] = useState(true);
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Read initial preference once the portfolio is ready
  useEffect(() => {
    if (!visible) return;
    const pref = localStorage.getItem("halcon-sound") !== "0";
    setSoundOn(pref);
  }, [visible]);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(AMBIENT_SRC);
    audio.loop   = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Fade helper
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimer.current) clearInterval(fadeTimer.current);
    audio.volume = 0;
    const step  = TARGET_VOL / (FADE_MS / 50);
    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(audioRef.current.volume + step, TARGET_VOL);
      audioRef.current.volume = next;
      if (next >= TARGET_VOL) clearInterval(fadeTimer.current!);
    }, 50);
  }, []);

  const fadeOut = useCallback((then?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimer.current) clearInterval(fadeTimer.current);
    const step = audio.volume / (FADE_MS / 50);
    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.max(audioRef.current.volume - step, 0);
      audioRef.current.volume = next;
      if (next <= 0) {
        clearInterval(fadeTimer.current!);
        then?.();
      }
    }, 50);
  }, []);

  // Start/stop based on visible + soundOn
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (visible && soundOn) {
      audio.play().then(fadeIn).catch(() => {
        // Autoplay blocked — silently skip; user can toggle manually
      });
    } else if (!soundOn) {
      fadeOut(() => audio.pause());
    } else {
      audio.pause();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, soundOn]);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      localStorage.setItem("halcon-sound", next ? "1" : "0");
      return next;
    });
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={toggleSound}
      aria-label={soundOn ? "Mute ambient music" : "Play ambient music"}
      className="fixed z-40 p-2 rounded-lg border border-border text-text-muted hover:text-accent-light hover:bg-bg-card hover:border-accent/25 transition-all bg-bg/85 backdrop-blur-xl shadow-lg shadow-black/10"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        right:  "max(1.5rem, env(safe-area-inset-right, 0px))",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {soundOn ? (
        <Volume2 size={18} strokeWidth={1.75} className="text-accent" />
      ) : (
        <VolumeX size={18} strokeWidth={1.75} />
      )}
    </motion.button>
  );
}
