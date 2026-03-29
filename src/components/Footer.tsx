import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FalconMark } from "./FalconLogo";
import { useLang } from "../context/LangContext";

export default function Footer() {
  const { t } = useLang()
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.footer
      ref={ref}
      style={{ y, opacity }}
      className="py-10 px-6 border-t border-border"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Falcon mark centered */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FalconMark size={28} />
        </motion.div>

        {/* Divider */}
        <div className="w-16 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        {/* Info row */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 text-sm text-text-muted">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-text font-medium">Josue Perez</span> · Bogota,
            Colombia
          </p>
          <p className="text-text-muted/50 text-xs tracking-wide">
            {t.footer.built}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
