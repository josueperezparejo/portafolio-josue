import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Shield } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";
import { useLang } from "../context/LangContext";

function TimelineDot({
  isMilitary,
  index,
}: {
  isMilitary?: boolean;
  index: number;
}) {
  const Icon = isMilitary ? Shield : Briefcase;
  return (
    <div className="hidden sm:flex flex-col items-center pt-1.5">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1,
          duration: 0.4,
          type: "spring",
          stiffness: 200,
        }}
        className="relative z-10 w-10 h-10 rounded-full border-2 border-border bg-bg flex items-center justify-center group-hover:border-accent transition-colors duration-300"
      >
        <Icon
          size={16}
          className="text-text-muted group-hover:text-accent transition-colors duration-300"
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/30"
          initial={{ scale: 1, opacity: 0 }}
          whileInView={{ scale: [1, 1.5, 1.5], opacity: [0, 0.4, 0] }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
        />
      </motion.div>
    </div>
  );
}

function AnimatedTimelineLine() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      ref={ref}
      className="absolute left-4.75 top-2 bottom-2 hidden sm:block"
    >
      <div className="w-px h-full bg-border/30" />
      <motion.div
        className="absolute top-0 left-0 w-px origin-top"
        style={{
          scaleY,
          height: "100%",
          background:
            "linear-gradient(to bottom, #0891b2, #6366f1, transparent)",
        }}
      />
    </div>
  );
}

export default function Experience() {
  const { t } = useLang();

  return (
    <AnimatedSection id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            {t.experience.label}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text={t.experience.h1} />{" "}
            <span className="bg-linear-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text={t.experience.h2} delay={0.2} />
            </span>
          </h2>
        </div>

        <div className="relative">
          <AnimatedTimelineLine />
          <div className="space-y-6">
            {t.experience.jobs.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative flex gap-6"
              >
                <TimelineDot
                  isMilitary={"isMilitary" in job && job.isMilitary}
                  index={i}
                />
                <GlowCard className="flex-1">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-semibold text-text text-base sm:text-lg leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-accent text-sm font-medium">
                          {job.company}
                        </p>
                      </div>
                      <div className="text-xs text-text-muted sm:text-right shrink-0 mt-1 sm:mt-0">
                        <p className="font-medium">{job.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-sm text-text-muted leading-relaxed flex gap-2"
                        >
                          <span className="text-accent mt-1.5 shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.1 }}
                          className="px-2.5 py-1 text-xs rounded-md bg-accent/10 text-accent-light border border-accent/10 cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
