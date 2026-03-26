/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ── PCE Technologies Design Tokens ──────────────────────────────────────
      colors: {
        // shadcn CSS-variable-based semantic tokens
        border:       "hsl(var(--border))",
        input:        "hsl(var(--input))",
        ring:         "hsl(var(--ring))",
        background:   "hsl(var(--background))",
        foreground:   "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ── PCE Material Design 3 raw palette (for direct use) ──────────────
        pce: {
          // Backgrounds & Surfaces
          "bg":                     "#111318",
          "surface":                "#111318",
          "surface-lowest":         "#0c0e13",
          "surface-low":            "#1a1b21",
          "surface-container":      "#1e1f25",
          "surface-high":           "#282a2f",
          "surface-highest":        "#33353a",
          "surface-bright":         "#37393f",
          "surface-variant":        "#33353a",
          // Primary (Electric Blue)
          "primary":                "#b4c5ff",
          "primary-container":      "#2563eb",
          "on-primary":             "#002a78",
          "on-primary-container":   "#eeefff",
          "inverse-primary":        "#0053db",
          // Secondary (Neon Cyan)
          "secondary":              "#a2e7ff",
          "secondary-container":    "#00d2fd",
          "secondary-fixed-dim":    "#3cd7ff",
          "on-secondary":           "#003642",
          // Tertiary (Soft Emerald)
          "tertiary":               "#4edea3",
          "tertiary-container":     "#007d55",
          "on-tertiary-container":  "#bdffdb",
          // Text
          "on-bg":                  "#e2e2e9",
          "on-surface":             "#e2e2e9",
          "on-surface-variant":     "#c3c6d7",
          // Borders
          "outline":                "#8d90a0",
          "outline-variant":        "#434655",
          // Error
          "error":                  "#ffb4ab",
          "error-container":        "#93000a",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body:     ["Manrope", "sans-serif"],
        label:    ["Manrope", "sans-serif"],
        sans:     ["Manrope", "sans-serif"],
      },

      // ── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        lg:    "var(--radius)",
        md:    "calc(var(--radius) - 2px)",
        sm:    "calc(var(--radius) - 4px)",
        xl:    "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full:  "9999px",
      },

      // ── Box Shadows (PCE glow effects) ───────────────────────────────────────
      boxShadow: {
        "glow-blue":  "0 0 20px rgba(37, 99, 235, 0.3)",
        "glow-cyan":  "0 0 20px rgba(0, 210, 253, 0.3)",
        "glow-sm":    "0 0 12px rgba(37, 99, 235, 0.2)",
        "card-hover": "0 0 24px rgba(37, 99, 235, 0.15), 0 4px 24px rgba(0,0,0,0.4)",
      },

      // ── Keyframe Animations ──────────────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(0, 210, 253, 0.4)" },
          "50%":      { boxShadow: "0 0 24px rgba(0, 210, 253, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "data-pulse": {
          "0%, 100%": { opacity: "1",   transform: "scale(1)" },
          "50%":      { opacity: "0.6", transform: "scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-in":        "fade-in 0.6s ease-out forwards",
        "slide-up":       "slide-up 0.6s ease-out forwards",
        "pulse-glow":     "pulse-glow 2s ease-in-out infinite",
        float:            "float 4s ease-in-out infinite",
        "data-pulse":     "data-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
