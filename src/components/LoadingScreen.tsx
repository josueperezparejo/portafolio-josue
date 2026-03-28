import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FalconMark } from "./FalconLogo";

// ---------------------------------------------------------------------------
// Types & translations
// ---------------------------------------------------------------------------
export type UserSettings = {
  lang: "es" | "en";
  theme: "dark" | "light";
  soundEnabled: boolean;
};

const BOOT_TIME = 6; // segundos

/** Web Audio — sin archivos ni autoplay hasta que el usuario active audio. */
let loaderAudioCtx: AudioContext | null = null;

function getLoaderAudio(): AudioContext | null {
  try {
    if (!loaderAudioCtx) loaderAudioCtx = new AudioContext();
    return loaderAudioCtx;
  } catch {
    return null;
  }
}

async function resumeLoaderAudio() {
  const ctx = getLoaderAudio();
  if (ctx?.state === "suspended") await ctx.resume();
}

function playThemeSwitchSound(mode: "dark" | "light") {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = mode === "dark" ? 900 : 3200;
  osc.type = mode === "dark" ? "square" : "sine";
  osc.frequency.setValueAtTime(mode === "dark" ? 165 : 495, t);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.038, t + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.start(t);
  osc.stop(t + 0.11);
}

function playLaunchSound() {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const freqs = [330, 440];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(g);
    g.connect(ctx.destination);
    const start = t + i * 0.07;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.035, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
    osc.start(start);
    osc.stop(start + 0.2);
  });
}

function playLangSwitchSound(lang: "es" | "en") {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(lang === "es" ? 260 : 380, t);
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.034, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.start(t);
  osc.stop(t + 0.1);
}

/** Navegación entre filas (↑ ↓ Tab) */
function playFocusTickSound() {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 880;
  osc.connect(g);
  g.connect(ctx.destination);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.018, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  osc.start(t);
  osc.stop(t + 0.045);
}

function playSoundPowerOn() {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  [523, 659].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(g);
    g.connect(ctx.destination);
    const start = t + i * 0.04;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.028, start + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
    osc.start(start);
    osc.stop(start + 0.13);
  });
}

/** Se reproduce al apagar: el usuario oye el “clic” de cierre antes de silenciar. */
function playSoundPowerDown() {
  const ctx = getLoaderAudio();
  if (!ctx) return;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(320, t);
  osc.frequency.exponentialRampToValueAtTime(90, t + 0.14);
  osc.connect(g);
  g.connect(ctx.destination);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.04, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.start(t);
  osc.stop(t + 0.17);
}

const T = {
  es: {
    langLabel: "IDIOMA",
    themeLabel: "MODO",
    soundLabel: "AUDIO",
    soundOff: "APAGADO",
    soundOn: "ENCENDIDO",
    es: "ESPAÑOL",
    en: "INGLÉS",
    dark: "OSCURO",
    light: "CLARO",
    launch: "INICIAR",
    hint: "← → CAMBIAR   ↑ ↓ NAVEGAR   ↵ CONFIRMAR",
  },
  en: {
    langLabel: "LANGUAGE",
    themeLabel: "THEME",
    soundLabel: "SOUND",
    soundOff: "OFF",
    soundOn: "ON",
    es: "SPANISH",
    en: "ENGLISH",
    dark: "DARK",
    light: "LIGHT",
    launch: "LAUNCH",
    hint: "← → CHANGE   ↑ ↓ NAVIGATE   ↵ CONFIRM",
  },
};

// ---------------------------------------------------------------------------
// Boot sequence lines (short — 1.3 s total before selection appears)
// ---------------------------------------------------------------------------
/** Fondo del overlay en modo claro: gris-azulado suave (menos “pantalla blanca”). */
const LOADER_BG_LIGHT = "#cfd8e3";

const BOOT_LINES = [
  "CLOUD SOLUTIONS ARCHITECT   [OK]",
  "FULLSTACK DEVELOPER         [OK]",
  "AWS CERTIFIED               [OK]",
  "BOGOTÁ, COLOMBIA            [OK]",
];

// ---------------------------------------------------------------------------
// Scanlines overlay (tint depends on loader theme)
// ---------------------------------------------------------------------------
function scanlineStyleFor(theme: "dark" | "light"): React.CSSProperties {
  const line =
    theme === "dark"
      ? "rgba(0,0,0,0.15)"
      : "rgba(51,65,85,0.09)";
  return {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 2px,${line} 2px,${line} 4px)`,
  };
}

// ---------------------------------------------------------------------------
// Option row — two choices, selection cursor ►
// ---------------------------------------------------------------------------
function OptionRow<T extends string>({
  label,
  options,
  value,
  focused,
  onChange,
  surface = "dark",
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  focused: boolean;
  onChange: (v: T) => void;
  surface?: "dark" | "light";
}) {
  const cyan = surface === "dark" ? "#22d3ee" : "#0e7490";
  const dim =
    surface === "dark"
      ? "rgba(34,211,238,0.35)"
      : "rgba(14,116,144,0.45)";
  const dimText =
    surface === "dark" ? "rgba(34,211,238,0.22)" : "rgba(14,116,144,0.28)";
  const labelColor = focused
    ? surface === "dark"
      ? "rgba(34,211,238,0.6)"
      : "rgba(14,116,144,0.75)"
    : surface === "dark"
      ? "rgba(34,211,238,0.28)"
      : "rgba(14,116,144,0.38)";

  return (
    <div style={{ marginBottom: 22 }}>
      {/* Row label */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: labelColor,
          marginBottom: 10,
          transition: "color 0.2s",
        }}
      >
        {label}
      </div>

      {/* Separator */}
      <div
        style={{
          height: 1,
          background: focused
            ? surface === "dark"
              ? "linear-gradient(90deg, rgba(34,211,238,0.4), transparent)"
              : "linear-gradient(90deg, rgba(14,116,144,0.45), transparent)"
            : surface === "dark"
              ? "linear-gradient(90deg, rgba(34,211,238,0.1), transparent)"
              : "linear-gradient(90deg, rgba(14,116,144,0.15), transparent)",
          marginBottom: 12,
          transition: "background 0.2s",
        }}
      />

      {/* Options */}
      <div style={{ display: "flex", gap: 32 }}>
        {options.map((opt) => {
          const selected = opt.key === value;
          return (
            <motion.button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 14,
                letterSpacing: "0.15em",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: selected ? cyan : dim,
                textShadow:
                  selected && focused
                    ? surface === "dark"
                      ? `0 0 12px ${cyan}, 0 0 24px rgba(34,211,238,0.4)`
                      : `0 0 10px ${cyan}, 0 0 20px rgba(14,116,144,0.28)`
                    : "none",
                transition: "color 0.15s, text-shadow 0.15s",
                padding: "4px 0",
              }}
            >
              <motion.span
                animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  color: focused ? cyan : dimText,
                  width: 14,
                  display: "inline-block",
                }}
              >
                ►
              </motion.span>
              <span style={{ fontWeight: selected ? 700 : 400 }}>
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Boot screen content
// ---------------------------------------------------------------------------
function BootScreen() {
  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -16,
        filter: "blur(6px)",
        transition: { duration: 0.35 },
      }}
      style={{ width: 340 }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <FalconMark size={52} variant="gradient" />
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.4em",
            color: "#22d3ee",
            textShadow:
              "0 0 18px rgba(34,211,238,0.55), 1px 0 rgba(99,102,241,0.6), -1px 0 rgba(34,211,238,0.35)",
          }}
        >
          HALCON OS
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(34,211,238,0.38)",
            letterSpacing: "0.25em",
            marginTop: 4,
          }}
        >
          v2.0.26 — JOSUE PEREZ
        </div>
        <div
          style={{
            height: 1,
            marginTop: 16,
            background:
              "linear-gradient(90deg,transparent,rgba(34,211,238,0.35),transparent)",
          }}
        />
      </div>

      {/* Boot lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {BOOT_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: (BOOT_TIME / BOOT_LINES.length) * i,
              duration: 0.35,
            }}
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "rgba(34,211,238,0.52)",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ color: "rgba(34,211,238,0.35)" }}>▸ </span>
            {line}
          </motion.div>
        ))}
      </div>

      {/* Loading bar — fills over the remaining time */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: 24 }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 9,
            color: "rgba(34,211,238,0.35)",
            letterSpacing: "0.25em",
            marginBottom: 7,
          }}
        >
          INITIALIZING...
        </div>
        <div
          style={{
            width: "100%",
            height: 3,
            background: "rgba(34,211,238,0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{
              width: ["0%", "12%", "35%", "60%", "82%", "95%", "100%"],
            }}
            transition={{
              delay: 0.4,
              duration: BOOT_TIME,
              times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
              ease: "easeInOut",
            }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #0891b2, #22d3ee, #6366f1)",
              borderRadius: 2,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Selection screen content
// ---------------------------------------------------------------------------
type FocusGroup = "lang" | "theme" | "sound" | "launch";

function SelectScreen({
  lang,
  setLang,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  focused,
  setFocused,
  onLaunch,
}: {
  lang: "es" | "en";
  setLang: (v: "es" | "en") => void;
  theme: "dark" | "light";
  setTheme: (v: "dark" | "light") => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  focused: FocusGroup;
  setFocused: (g: FocusGroup) => void;
  onLaunch: () => void;
}) {
  const t = T[lang];
  const surface = theme;
  const cyan = surface === "dark" ? "#22d3ee" : "#0e7490";
  const logoShadow =
    surface === "dark"
      ? "0 0 12px rgba(34,211,238,0.4)"
      : "0 0 10px rgba(14,116,144,0.35)";
  const dividerGrad =
    surface === "dark"
      ? "linear-gradient(90deg,transparent,rgba(34,211,238,0.2),transparent)"
      : "linear-gradient(90deg,transparent,rgba(14,116,144,0.28),transparent)";
  const launchBgIdle =
    surface === "dark" ? "rgba(34,211,238,0.05)" : "rgba(14,116,144,0.08)";
  const launchBgFocus =
    surface === "dark"
      ? "linear-gradient(90deg, rgba(8,145,178,0.18), rgba(99,102,241,0.18))"
      : "linear-gradient(90deg, rgba(14,116,144,0.22), rgba(99,102,241,0.15))";
  const launchColorDim =
    surface === "dark" ? "rgba(34,211,238,0.5)" : "rgba(14,116,144,0.55)";
  const launchOutline =
    focused === "launch"
      ? surface === "dark"
        ? "rgba(34,211,238,0.35)"
        : "rgba(14,116,144,0.45)"
      : surface === "dark"
        ? "rgba(34,211,238,0.1)"
        : "rgba(14,116,144,0.2)";
  const launchShadow =
    focused === "launch"
      ? surface === "dark"
        ? "0 0 20px rgba(34,211,238,0.15), inset 0 0 20px rgba(34,211,238,0.04)"
        : "0 0 18px rgba(14,116,144,0.12), inset 0 0 16px rgba(14,116,144,0.06)"
      : "none";
  const hintColor =
    surface === "dark" ? "rgba(34,211,238,0.25)" : "rgba(14,116,144,0.4)";

  return (
    <motion.div
      key="select"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.35 },
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 340 }}
    >
      {/* Mini logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
        }}
      >
        <FalconMark size={28} variant="gradient" />
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.35em",
            color: cyan,
            textShadow: logoShadow,
          }}
        >
          HALCON OS
        </div>
      </div>

      {/* Language row */}
      <div onClick={() => setFocused("lang")}>
        <OptionRow
          label={t.langLabel}
          options={[
            { key: "es" as const, label: t.es },
            { key: "en" as const, label: t.en },
          ]}
          value={lang}
          focused={focused === "lang"}
          onChange={setLang}
          surface={surface}
        />
      </div>

      {/* Theme row */}
      <div onClick={() => setFocused("theme")} style={{ marginTop: 4 }}>
        <OptionRow
          label={t.themeLabel}
          options={[
            { key: "dark" as const, label: t.dark },
            { key: "light" as const, label: t.light },
          ]}
          value={theme}
          focused={focused === "theme"}
          onChange={setTheme}
          surface={surface}
        />
      </div>

      {/* Sound row — off by default (no autoplay) */}
      <div onClick={() => setFocused("sound")} style={{ marginTop: 4 }}>
        <OptionRow
          label={t.soundLabel}
          options={[
            { key: "off" as const, label: t.soundOff },
            { key: "on" as const, label: t.soundOn },
          ]}
          value={soundEnabled ? "on" : "off"}
          focused={focused === "sound"}
          onChange={(k) => setSoundEnabled(k === "on")}
          surface={surface}
        />
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          margin: "20px 0",
          background: dividerGrad,
        }}
      />

      {/* Launch button */}
      <motion.button
        onClick={onLaunch}
        onMouseEnter={() => setFocused("launch")}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: "100%",
          padding: "12px 0",
          border: "none",
          cursor: "pointer",
          fontFamily: "monospace",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.35em",
          borderRadius: 2,
          background: focused === "launch" ? launchBgFocus : launchBgIdle,
          color: focused === "launch" ? cyan : launchColorDim,
          boxShadow: launchShadow,
          outline: `1px solid ${launchOutline}`,
          transition: "all 0.2s",
        }}
      >
        [ {t.launch} ]
      </motion.button>

      {/* Keyboard hint */}
      <div
        style={{
          marginTop: 20,
          fontFamily: "monospace",
          fontSize: 14,
          color: hintColor,
          textAlign: "center",
          letterSpacing: "0.1em",
        }}
      >
        {t.hint}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
type Phase = "booting" | "select" | "exit";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: (s: UserSettings) => void;
}) {
  const [phase, setPhase] = useState<Phase>("booting");
  const [lang, setLangState] = useState<"es" | "en">("en");
  const [theme, setThemeState] = useState<"dark" | "light">("dark");
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [focused, setFocused] = useState<FocusGroup>("lang");
  const [themeFlashKey, setThemeFlashKey] = useState(0);
  const soundEnabledRef = useRef(true);
  const phaseRef = useRef(phase);
  const themeForFx = phase === "booting" ? "dark" : theme;

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const setSoundEnabled = useCallback((v: boolean) => {
    setSoundEnabledState((prev) => {
      if (prev === v) return prev;
      if (!prev && v) {
        void resumeLoaderAudio().then(() => playSoundPowerOn());
      } else if (prev && !v) {
        playSoundPowerDown();
      }
      return v;
    });
  }, []);

  const setTheme = useCallback((v: "dark" | "light") => {
    setThemeState((prev) => {
      if (prev === v) return prev;
      if (soundEnabledRef.current) playThemeSwitchSound(v);
      if (phaseRef.current === "select") {
        queueMicrotask(() => setThemeFlashKey((k) => k + 1));
      }
      return v;
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setLang = useCallback((v: "es" | "en") => {
    setLangState((prev) => {
      if (prev === v) return prev;
      if (soundEnabledRef.current) playLangSwitchSound(v);
      return v;
    });
  }, []);

  // Boot sequence → selection screen
  useEffect(() => {
    const t = setTimeout(() => setPhase("select"), BOOT_TIME * 1000 + 400);
    return () => clearTimeout(t);
  }, []);

  // Evita que el scroll del documento mueva las secciones detrás del overlay
  // (p. ej. rueda del ratón o trackpad durante idioma/tema).
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  useEffect(() => {
    return () => {
      void loaderAudioCtx?.close();
      loaderAudioCtx = null;
    };
  }, []);

  const handleLaunch = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (soundEnabledRef.current) playLaunchSound();
    setPhase("exit");
    setTimeout(
      () => onComplete({ lang, theme, soundEnabled }),
      650,
    );
  }, [lang, theme, soundEnabled, onComplete]);

  // Keyboard navigation (only active during select phase)
  useEffect(() => {
    if (phase !== "select") return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "Tab":
          e.preventDefault();
          if (soundEnabledRef.current) playFocusTickSound();
          setFocused((f) =>
            f === "lang"
              ? "theme"
              : f === "theme"
                ? "sound"
                : f === "sound"
                  ? "launch"
                  : "lang",
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          if (soundEnabledRef.current) playFocusTickSound();
          setFocused((f) =>
            f === "lang"
              ? "launch"
              : f === "theme"
                ? "lang"
                : f === "sound"
                  ? "theme"
                  : "sound",
          );
          break;
        case "ArrowLeft":
          if (focused === "lang") setLang("es");
          if (focused === "theme") setTheme("dark");
          if (focused === "sound") setSoundEnabled(false);
          break;
        case "ArrowRight":
          if (focused === "lang") setLang("en");
          if (focused === "theme") setTheme("light");
          if (focused === "sound") setSoundEnabled(true);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focused === "launch") {
            handleLaunch();
            break;
          }
          if (focused === "lang") setLang(lang === "es" ? "en" : "es");
          if (focused === "theme")
            setTheme(theme === "dark" ? "light" : "dark");
          if (focused === "sound") setSoundEnabled(!soundEnabled);
          setFocused((f) =>
            f === "lang"
              ? "theme"
              : f === "theme"
                ? "sound"
                : f === "sound"
                  ? "launch"
                  : "lang",
          );
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    phase,
    focused,
    lang,
    theme,
    soundEnabled,
    handleLaunch,
    setLang,
    setTheme,
    setSoundEnabled,
  ]);

  if (phase === "exit") return null;

  return (
    <motion.div
      key="loading-root"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backgroundColor:
          themeForFx === "dark" ? "#030712" : LOADER_BG_LIGHT,
      }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(14px)",
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      }}
      transition={{
        opacity: { duration: 0.35 },
        backgroundColor: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      {themeFlashKey > 0 && (
        <motion.div
          key={themeFlashKey}
          initial={{ opacity: theme === "light" ? 0.22 : 0.18 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              theme === "light"
                ? "radial-gradient(circle at 50% 42%, rgba(203,213,225,0.55), transparent 64%)"
                : "radial-gradient(circle at 50% 42%, rgba(34,211,238,0.4), transparent 58%)",
          }}
        />
      )}

      <div style={scanlineStyleFor(themeForFx)} />
      <motion.div
        animate={{
          background:
            themeForFx === "dark"
              ? "radial-gradient(ellipse at center, transparent 54%, rgba(0,0,0,0.76) 100%)"
              : "radial-gradient(ellipse at center, transparent 52%, rgba(51,65,85,0.12) 100%)",
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 3 }}>
        <AnimatePresence mode="wait">
          {phase === "booting" && <BootScreen />}
          {phase === "select" && (
            <SelectScreen
              lang={lang}
              setLang={setLang}
              theme={theme}
              setTheme={setTheme}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              focused={focused}
              setFocused={setFocused}
              onLaunch={handleLaunch}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
