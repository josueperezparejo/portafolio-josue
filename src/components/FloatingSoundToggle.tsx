import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function FloatingSoundToggle({
  visible,
}: {
  visible: boolean;
}) {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (!visible) return;
    setSoundOn(localStorage.getItem("halcon-sound") !== "0");
  }, [visible]);

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
      aria-label={soundOn ? "Mute UI sounds" : "Enable UI sounds"}
      className="fixed z-40 p-2 rounded-lg border border-border text-text-muted hover:text-accent-light hover:bg-bg-card hover:border-accent/25 transition-all bg-bg/85 backdrop-blur-xl shadow-lg shadow-black/10"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        right: "max(1.5rem, env(safe-area-inset-right, 0px))",
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
