import { motion } from "framer-motion";

type FalconMarkProps = {
  size?: number;
  className?: string;
  variant?: "gradient" | "white" | "muted" | "stroke";
};

export function FalconMark({
  size = 40,
  className = "",
  variant = "gradient",
}: FalconMarkProps) {
  const aspectRatio = 650 / 866;
  const width = size;
  const height = Math.round(size * aspectRatio);

  const gradientStyle: React.CSSProperties = {
    width,
    height,
    maskImage: "url(/falcon.svg)",
    WebkitMaskImage: "url(/falcon.svg)",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    display: "block",
  };

  if (variant === "gradient") {
    return (
      <div
        className={className}
        style={{
          ...gradientStyle,
          background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 40%, #6366f1 100%)",
        }}
      />
    );
  }

  if (variant === "white") {
    return (
      <div
        className={className}
        style={{ ...gradientStyle, background: "white" }}
      />
    );
  }

  if (variant === "muted") {
    return (
      <div
        className={className}
        style={{ ...gradientStyle, background: "rgba(255,255,255,0.35)" }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{ ...gradientStyle, background: "rgba(255,255,255,0.055)" }}
    />
  );
}

type FalconLogoProps = {
  size?: number;
  className?: string;
};

export default function FalconLogo({ size = 36, className = "" }: FalconLogoProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <FalconMark size={size} variant="gradient" />
      <span
        className="font-bold tracking-widest text-sm"
        style={{
          background: "linear-gradient(90deg, #22d3ee, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.2em",
        }}
      >
        HALCON
      </span>
    </motion.div>
  );
}
