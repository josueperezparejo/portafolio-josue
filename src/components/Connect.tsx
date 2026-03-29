import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "../hooks/useScrollReveal";
import { Mail, Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import GlowCard from "./GlowCard";
import TextReveal from "./TextReveal";
import ContactForm from "./ContactForm";
import { useLang } from "../context/LangContext";

// ── Replace with your real WhatsApp number (country code, no + or spaces) ──
const WHATSAPP_NUMBER = "573005911078";

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

type SocialItem = {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    width?: number;
    height?: number;
  }>;
  label: string;
  href: string;
  color: string;
};

export default function Connect() {
  const { t } = useLang();

  const socials: SocialItem[] = [
    {
      icon: ({ className, size }) => (
        <LinkedInIcon width={size} height={size} className={className} />
      ),
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/JosueDavidPerezParejo",
      color: "hover:border-blue-500/50 hover:shadow-blue-500/10",
    },
    {
      icon: ({ className, size }) => (
        <GitHubIcon width={size} height={size} className={className} />
      ),
      label: "GitHub",
      href: "https://www.github.com/josueperezparejo",
      color: "hover:border-gray-400/50 hover:shadow-gray-400/10",
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: "http://portafolio-josue.netlify.app/",
      color: "hover:border-accent/50 hover:shadow-accent/10",
    },
    {
      icon: Mail,
      label: "Email",
      href: `mailto:josueperezparejo@gmail.com?subject=${encodeURIComponent(t.connect.emailSubject)}&body=${encodeURIComponent(t.connect.emailBody)}`,
      color: "hover:border-red-400/50 hover:shadow-red-400/10",
    },
  ];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.connect.whatsappMsg)}`;

  return (
    <AnimatedSection id="connect" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-medium tracking-widest uppercase mb-3"
          >
            {t.connect.label}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            <TextReveal text={t.connect.h1} />{" "}
            <span className="bg-linear-to-r from-accent to-gradient-end bg-clip-text text-transparent">
              <TextReveal text={t.connect.h2} delay={0.15} />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-text-muted max-w-lg mx-auto"
          >
            {t.connect.description}
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: social grid + WhatsApp CTA */}
          <div className="space-y-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 gap-3"
            >
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GlowCard
                    className={`transition-all duration-300 hover:shadow-lg ${s.color}`}
                  >
                    <div className="flex flex-col items-center gap-3 p-5">
                      <div className="w-11 h-11 rounded-xl bg-bg-card flex items-center justify-center">
                        <s.icon size={20} className="text-text-muted" />
                      </div>
                      <span className="text-sm font-medium text-text-muted">
                        {s.label}
                      </span>
                    </div>
                  </GlowCard>
                </motion.a>
              ))}
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0">
                <WhatsAppIcon
                  width={18}
                  height={18}
                  className="text-[#25D366]"
                />
              </div>
              <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors duration-200">
                WhatsApp
              </span>
            </motion.a>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <GlowCard>
              <div className="p-6 sm:p-8">
                <ContactForm />
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
