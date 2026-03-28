import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Lang = "es" | "en";

const LABELS: Record<
  Lang,
  {
    title: string;
    handle: string;
    origin: string;
    browser: string;
    env: string;
    display: string;
    tz: string;
    link: string;
    isp: string;
    syncing: string;
    netErr: string;
    secure: string;
    insecure: string;
  }
> = {
  es: {
    title: "SEÑAL DE ENTRADA",
    handle: "IDENT",
    origin: "ORIGEN",
    browser: "EXPLORADOR",
    env: "ENTORNO",
    display: "PANTALLA",
    tz: "HUSO",
    link: "ENLACE",
    isp: "PROVEEDOR / ASN",
    syncing: "SINCRONIZANDO RED…",
    netErr: "SIN DATOS DE RED",
    secure: "CIFRADO",
    insecure: "ABIERTO",
  },
  en: {
    title: "INGRESS SIGNAL",
    handle: "HANDLE",
    origin: "ORIGIN",
    browser: "BROWSER",
    env: "ENV",
    display: "DISPLAY",
    tz: "TZ",
    link: "LINK",
    isp: "ISP / ASN",
    syncing: "SYNCING UPLINK…",
    netErr: "NO UPLINK DATA",
    secure: "SECURE",
    insecure: "OPEN",
  },
};

type IpApi = {
  ip?: string;
  city?: string | null;
  region?: string | null;
  country_name?: string | null;
  org?: string | null;
  error?: boolean;
  reason?: string;
};

function getOrCreateHandle(): string {
  const k = "halcon-terminal-handle";
  try {
    let h = sessionStorage.getItem(k);
    if (!h) {
      h = crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase();
      sessionStorage.setItem(k, h);
    }
    return h;
  } catch {
    return "GUEST";
  }
}

function parseUserAgent(ua: string): { browser: string; os: string } {
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/Windows NT 10|Windows NT 11/.test(ua)) os = "Windows 10+";
  else if (/Windows/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Linux/.test(ua) && !/Android/.test(ua)) os = "Linux";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";

  return { browser, os };
}

function collectLocalIntel() {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const { browser, os } = parseUserAgent(ua);
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "—";
  const langPref =
    typeof navigator !== "undefined" ? navigator.language : "—";
  const cores =
    typeof navigator !== "undefined" && "hardwareConcurrency" in navigator
      ? String(navigator.hardwareConcurrency)
      : "—";
  const dpr =
    typeof window !== "undefined" ? window.devicePixelRatio ?? 1 : 1;
  const sw =
    typeof window !== "undefined" && window.screen
      ? window.screen.width
      : 0;
  const sh =
    typeof window !== "undefined" && window.screen
      ? window.screen.height
      : 0;
  const proto =
    typeof window !== "undefined" ? window.location.protocol : "";
  const online =
    typeof navigator !== "undefined" ? navigator.onLine : true;

  return {
    handle: getOrCreateHandle(),
    browser,
    os,
    uaShort: ua.length > 72 ? `${ua.slice(0, 69)}…` : ua,
    tz,
    langPref,
    cores,
    dpr,
    screen: `${sw}×${sh}`,
    secure: proto === "https:",
    online,
  };
}

async function fetchGeo(signal: AbortSignal): Promise<IpApi | null> {
  const urls = [
    "https://ipapi.co/json/",
    "https://ipwho.is/me",
  ] as const;

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        signal,
        headers: { Accept: "application/json" },
      });
      if (!r.ok) continue;
      const data = (await r.json()) as Record<string, unknown>;
      if (url.includes("ipwho.is")) {
        if (data.success === false) continue;
        const conn = data.connection;
        let org: string | null = null;
        if (conn && typeof conn === "object" && conn !== null && "isp" in conn) {
          org = String((conn as { isp?: string }).isp ?? "");
        }
        return {
          ip: String(data.ip ?? ""),
          city: data.city != null ? String(data.city) : null,
          region: data.region != null ? String(data.region) : null,
          country_name:
            data.country != null ? String(data.country) : null,
          org,
        };
      }
      if (data.error === true) continue;
      return {
        ip: data.ip != null ? String(data.ip) : undefined,
        city: data.city != null ? String(data.city) : null,
        region: data.region != null ? String(data.region) : null,
        country_name:
          data.country_name != null ? String(data.country_name) : null,
        org: data.org != null ? String(data.org) : null,
      };
    } catch {
      continue;
    }
  }
  return null;
}

function Row({
  k,
  v,
  dim,
  accent,
}: {
  k: string;
  v: string;
  dim: string;
  accent: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          fontSize: 8,
          letterSpacing: "0.28em",
          color: dim,
          marginBottom: 3,
        }}
      >
        {k}
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.06em",
          color: accent,
          lineHeight: 1.35,
          wordBreak: "break-word",
        }}
      >
        ▸ {v}
      </div>
    </div>
  );
}

export default function SessionIntelPanel({
  lang,
  theme,
  stacked = false,
}: {
  lang: Lang;
  theme: "dark" | "light";
  /** En pantallas estrechas: borde superior en lugar de lateral */
  stacked?: boolean;
}) {
  const L = LABELS[lang];
  const local = useMemo(() => collectLocalIntel(), []);
  const [geo, setGeo] = useState<IpApi | null>(null);
  const [geoLoading, setGeoLoading] = useState(true);

  const surface = theme;
  const accent = surface === "dark" ? "#22d3ee" : "#0e7490";
  const dim =
    surface === "dark" ? "rgba(34,211,238,0.38)" : "rgba(14,116,144,0.55)";
  const border =
    surface === "dark"
      ? "rgba(34,211,238,0.22)"
      : "rgba(14,116,144,0.35)";
  const edgeBorder = stacked
    ? { borderTop: `1px solid ${border}`, borderLeft: "none" }
    : { borderLeft: `1px solid ${border}`, borderTop: "none" };

  useEffect(() => {
    const ac = new AbortController();
    const t = window.setTimeout(() => ac.abort(), 12000);
    setGeoLoading(true);
    fetchGeo(ac.signal)
      .then((g) => setGeo(g))
      .catch(() => setGeo(null))
      .finally(() => {
        window.clearTimeout(t);
        setGeoLoading(false);
      });
    return () => {
      ac.abort();
      window.clearTimeout(t);
    };
  }, []);

  const originLine = geoLoading
    ? L.syncing
    : geo
      ? [geo.city, geo.region, geo.country_name].filter(Boolean).join(" · ") ||
        geo.country_name ||
        "—"
      : L.netErr;

  const uplink =
    !geoLoading && geo?.ip
      ? geo.ip
      : geoLoading
        ? "···.···.···.···"
        : "—";

  const isp = geo?.org ? String(geo.org) : geoLoading ? "…" : "—";

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: stacked ? 0 : 14,
        y: stacked ? 12 : 0,
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: stacked ? "100%" : 300,
        maxWidth: "100%",
        flexShrink: 0,
        padding: "18px 16px",
        ...edgeBorder,
        background: "transparent",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          fontSize: 9,
          letterSpacing: "0.35em",
          color: accent,
          marginBottom: 14,
          textShadow:
            surface === "dark"
              ? "0 0 12px rgba(34,211,238,0.35)"
              : "none",
        }}
      >
        ◆ {L.title}
      </div>

      <Row
        k={L.handle}
        v={local.handle}
        dim={dim}
        accent={accent}
      />
      <Row
        k={L.origin}
        v={originLine}
        dim={dim}
        accent={accent}
      />
      <Row k={L.link} v={uplink} dim={dim} accent={accent} />
      <Row k={L.isp} v={isp} dim={dim} accent={accent} />

      <div
        style={{
          height: 1,
          margin: "12px 0",
          background: `linear-gradient(90deg, ${border}, transparent)`,
        }}
      />

      <Row
        k={L.browser}
        v={`${local.browser} / ${local.os}`}
        dim={dim}
        accent={accent}
      />
      <Row k={L.env} v={`${local.os} · ${local.cores} cores`} dim={dim} accent={accent} />
      <Row k={L.display} v={`${local.screen} @${local.dpr}x`} dim={dim} accent={accent} />
      <Row k={L.tz} v={local.tz} dim={dim} accent={accent} />
      <Row
        k="LOCALE"
        v={local.langPref}
        dim={dim}
        accent={accent}
      />

      <div
        style={{
          marginTop: 14,
          fontSize: 8,
          letterSpacing: "0.2em",
          color: dim,
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span>
          {local.secure ? `● ${L.secure}` : `○ ${L.insecure}`}
        </span>
        <span>{local.online ? "NET: OK" : "NET: OFF"}</span>
      </div>

      <div
        style={{
          marginTop: 10,
          fontSize: 7,
          color: dim,
          opacity: 0.85,
          lineHeight: 1.4,
          wordBreak: "break-all",
        }}
      >
        UA: {local.uaShort}
      </div>
    </motion.aside>
  );
}
