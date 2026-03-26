// ── PCE Technologies — Framer Motion Animation Variants ──────────────────────

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stagger container — children animate one after another
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

// Card hover — lift + glow
export const cardHover = {
  rest:  { y: 0,  scale: 1,    boxShadow: "0 0 0px rgba(37,99,235,0)" },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: "0 0 28px rgba(37,99,235,0.18), 0 8px 32px rgba(0,0,0,0.4)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

// Button hover glow
export const buttonHover = {
  rest:  { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } },
  tap:   { scale: 0.96 },
}

// Hero text stagger (fast, dramatic)
export const heroContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const heroItem = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// Navbar slide down on load
export const navbarReveal = {
  hidden:  { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
}

// Step / timeline item
export const stepItem = {
  hidden:  { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}
