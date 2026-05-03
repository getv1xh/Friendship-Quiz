import { Theme } from "@/config/site";

export interface ThemeTokens {
  /** CSS vars injected on <html> */
  vars: Record<string, string>;
  /** Classes applied to <body> */
  bodyClass: string;
  /** Confetti colour palette */
  confettiColors: string[];
}

const themes: Record<Theme, ThemeTokens> = {
  // ── Dark Premium ────────────────────────────────────────────────────────────
  dark: {
    vars: {
      "--bg":           "#0d0d0f",
      "--bg-card":      "rgba(255,255,255,0.04)",
      "--bg-card-hover":"rgba(255,255,255,0.07)",
      "--border":       "rgba(255,255,255,0.08)",
      "--border-accent":"rgba(160,120,255,0.35)",
      "--accent":       "#a47aff",
      "--accent-dark":  "#7c52d4",
      "--accent2":      "#ff6b9d",
      "--text-primary": "#f0eeff",
      "--text-secondary":"#8b85a0",
      "--text-muted":   "#504a63",
      "--shadow-card":  "0 8px 40px rgba(0,0,0,0.55)",
      "--radius-card":  "24px",
      "--progress-bg":  "rgba(255,255,255,0.08)",
      "--option-bg":    "rgba(255,255,255,0.04)",
      "--option-hover": "rgba(164,122,255,0.12)",
      "--option-selected-bg": "rgba(164,122,255,0.18)",
      "--option-selected-border": "#a47aff",
      "--blob1-color":  "#4a1e8c",
      "--blob2-color":  "#1a0a3c",
      "--input-bg":     "rgba(255,255,255,0.06)",
      "--input-border": "rgba(255,255,255,0.12)",
      "--input-focus":  "#a47aff",
      "--score-track":  "rgba(255,255,255,0.08)",
    },
    bodyClass: "theme-dark",
    confettiColors: ["#a47aff", "#ff6b9d", "#7c52d4", "#ffffff", "#c4a9ff"],
  },

  // ── Pink ────────────────────────────────────────────────────────────────────
  pink: {
    vars: {
      "--bg":           "#fff5f8",
      "--bg-card":      "rgba(255,255,255,0.85)",
      "--bg-card-hover":"rgba(255,255,255,0.95)",
      "--border":       "rgba(248,200,220,0.5)",
      "--border-accent":"rgba(209,75,106,0.4)",
      "--accent":       "#d14b6a",
      "--accent-dark":  "#b03358",
      "--accent2":      "#f0a0c0",
      "--text-primary": "#2d1515",
      "--text-secondary":"#6b3a3a",
      "--text-muted":   "#c48a9a",
      "--shadow-card":  "0 8px 40px rgba(107,45,45,0.1)",
      "--radius-card":  "28px",
      "--progress-bg":  "rgba(248,200,220,0.4)",
      "--option-bg":    "rgba(255,255,255,0.7)",
      "--option-hover": "rgba(248,200,220,0.3)",
      "--option-selected-bg": "rgba(209,75,106,0.12)",
      "--option-selected-border": "#d14b6a",
      "--blob1-color":  "#f8c8dc",
      "--blob2-color":  "#ffd6e7",
      "--input-bg":     "rgba(255,255,255,0.8)",
      "--input-border": "rgba(248,200,220,0.6)",
      "--input-focus":  "#d14b6a",
      "--score-track":  "rgba(248,200,220,0.4)",
    },
    bodyClass: "theme-pink",
    confettiColors: ["#d14b6a", "#f8c8dc", "#f0a0c0", "#ffffff", "#6b2d2d"],
  },

  // ── Green ───────────────────────────────────────────────────────────────────
  green: {
    vars: {
      "--bg":           "#f4faf6",
      "--bg-card":      "rgba(255,255,255,0.88)",
      "--bg-card-hover":"rgba(255,255,255,0.97)",
      "--border":       "rgba(134,210,160,0.35)",
      "--border-accent":"rgba(56,168,95,0.45)",
      "--accent":       "#38a85f",
      "--accent-dark":  "#2a7c47",
      "--accent2":      "#86d2a0",
      "--text-primary": "#1a2e22",
      "--text-secondary":"#3d6b4f",
      "--text-muted":   "#8ab89a",
      "--shadow-card":  "0 8px 40px rgba(30,80,50,0.09)",
      "--radius-card":  "26px",
      "--progress-bg":  "rgba(134,210,160,0.3)",
      "--option-bg":    "rgba(255,255,255,0.75)",
      "--option-hover": "rgba(134,210,160,0.2)",
      "--option-selected-bg": "rgba(56,168,95,0.1)",
      "--option-selected-border": "#38a85f",
      "--blob1-color":  "#b8e8c8",
      "--blob2-color":  "#d4f0de",
      "--input-bg":     "rgba(255,255,255,0.8)",
      "--input-border": "rgba(134,210,160,0.5)",
      "--input-focus":  "#38a85f",
      "--score-track":  "rgba(134,210,160,0.3)",
    },
    bodyClass: "theme-green",
    confettiColors: ["#38a85f", "#86d2a0", "#2a7c47", "#ffffff", "#b8e8c8"],
  },
};

export function getThemeTokens(theme: Theme): ThemeTokens {
  return themes[theme];
}

/** Converts tokens to inline style string for <html> */
export function themeVarsToStyle(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}
