/**
 * JS/TS mirror of the design tokens defined in `src/app/globals.css`.
 *
 * globals.css is the canonical source of truth for CSS/Tailwind usage
 * (bg-primary, text-accent, rounded-md, etc.) — use Tailwind classes in
 * components whenever possible.
 *
 * This file exists only for the contexts where a CSS variable can't
 * reach: Framer Motion animation variants, inline SVG fills, and future
 * charting/data-viz libraries that need a raw hex string in JS. If you
 * change a color/radius/duration in globals.css, update it here too.
 */

export const colors = {
  ink: "#12161C",
  paper: "#F7F6F2",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E4E2DC",
  muted: "#5B6572",

  primary: "#1E4FD1",
  primaryForeground: "#FFFFFF",
  secondary: "#3D4A5C",
  secondaryForeground: "#FFFFFF",
  accent: "#227081",
  accentForeground: "#FFFFFF",
  accentOnDark: "#2E96AC",
  success: "#0F7A3C",
  warning: "#9C6A00",
  danger: "#D6362E",

  brand: {
    blue: "#3279FF",
    red: "#F64038",
    amber: "#FFBA0A",
    green: "#2BB258",
  },
} as const;

/** The four brand hues in ribbon order — for the "interlock" motif
 *  (division card accents, section-rule gradients). */
export const interlock = [
  colors.brand.blue,
  colors.brand.red,
  colors.brand.amber,
  colors.brand.green,
] as const;

export const radius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  pill: "999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgba(18, 22, 28, 0.06)",
  md: "0 4px 16px rgba(18, 22, 28, 0.08)",
  lg: "0 12px 32px rgba(18, 22, 28, 0.10)",
} as const;

/** Motion should whisper — reuse these durations/easing in every
 *  Framer Motion variant so animation timing stays consistent. */
export const motion = {
  duration: {
    fast: 0.15,
    base: 0.25,
    slow: 0.45,
  },
  ease: [0.4, 0, 0.2, 1] as const,
} as const;

export const layout = {
  containerContent: "80rem", // 1280px
  containerWide: "90rem", // 1440px
  measure: "65ch",
} as const;

export const fonts = {
  display: '"Space Grotesk Variable", "Space Grotesk", ui-sans-serif, sans-serif',
  body: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace',
} as const;

export const theme = { colors, interlock, radius, shadow, motion, layout, fonts } as const;

export default theme;
