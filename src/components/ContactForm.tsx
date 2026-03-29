import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLang } from "../context/LangContext";

type Status = "idle" | "submitting" | "success" | "error";

function FieldError({ msg }: { msg: string | undefined }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1 flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle size={11} />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputBase =
  "w-full rounded-xl bg-bg-card border border-border px-4 py-3 text-sm text-text placeholder:text-text-muted/50 outline-none transition-all duration-200 focus:border-accent/60 focus:ring-2 focus:ring-accent/10";
const inputError =
  "border-red-400/60 focus:border-red-400/60 focus:ring-red-400/10";

export default function ContactForm() {
  const { t } = useLang();
  const f = t.connect.form;
  const [status, setStatus] = useState<Status>("idle");

  const schema = Yup.object({
    name: Yup.string().required(f.errors.nameRequired),
    email: Yup.string()
      .email(f.errors.emailInvalid)
      .required(f.errors.emailRequired),
    subject: Yup.string().required(f.errors.subjectRequired),
    message: Yup.string()
      .min(20, f.errors.messageTooShort)
      .required(f.errors.messageRequired),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      "bot-field": "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      setStatus("submitting");
      try {
        const body = new URLSearchParams({
          "form-name": "contact",
          ...values,
        }).toString();
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });
        if (!res.ok) throw new Error("Network error");
        setStatus("success");
        helpers.resetForm();
      } catch {
        setStatus("error");
      }
    },
  });

  const err = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : undefined;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center"
        >
          <CheckCircle2 size={32} className="text-accent" />
        </motion.div>
        <h3 className="text-lg font-semibold text-text">{f.success.title}</h3>
        <p className="text-sm text-text-muted max-w-xs">{f.success.message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-accent hover:underline underline-offset-4"
        >
          ← {f.submit}
        </button>
      </motion.div>
    );
  }

  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-red-400/10 flex items-center justify-center"
        >
          <AlertCircle size={32} className="text-red-400" />
        </motion.div>
        <h3 className="text-lg font-semibold text-text">{f.error.title}</h3>
        <p className="text-sm text-text-muted max-w-xs">{f.error.message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-accent hover:underline underline-offset-4"
        >
          ← {f.submit}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" {...formik.getFieldProps("bot-field")} />
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            {f.name.label}
          </label>
          <input
            {...formik.getFieldProps("name")}
            placeholder={f.name.placeholder}
            className={`${inputBase} ${err("name") ? inputError : ""}`}
          />
          <FieldError msg={err("name")} />
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            {f.email.label}
          </label>
          <input
            type="email"
            {...formik.getFieldProps("email")}
            placeholder={f.email.placeholder}
            className={`${inputBase} ${err("email") ? inputError : ""}`}
          />
          <FieldError msg={err("email")} />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5">
          {f.subject.label}
        </label>
        <input
          {...formik.getFieldProps("subject")}
          placeholder={f.subject.placeholder}
          className={`${inputBase} ${err("subject") ? inputError : ""}`}
        />
        <FieldError msg={err("subject")} />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-medium text-text-muted mb-1.5">
          {f.message.label}
        </label>
        <textarea
          rows={5}
          {...formik.getFieldProps("message")}
          placeholder={f.message.placeholder}
          className={`${inputBase} resize-none ${err("message") ? inputError : ""}`}
        />
        <FieldError msg={err("message")} />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-accent to-accent-dark text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/20 transition-shadow duration-300"
      >
        {status === "submitting" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            {f.submitting}
          </>
        ) : (
          <>
            <Send size={15} />
            {f.submit}
          </>
        )}
      </motion.button>
    </form>
  );
}
