# PCE Technologies — Design System

Extracted from the generated Stitch screen: **PCE Technologies Home** (`projects/9672867872073438625/screens/f362415e046c4244bf2aedf8bb208b8b`)

---

## Typography

| Role | Font Family | Weights |
|------|-------------|---------|
| Headings / Display | `Space Grotesk` | 300, 400, 500, 600, 700 |
| Body / Labels / UI | `Manrope` | 300, 400, 500, 600, 700 |
| Icons | `Material Symbols Outlined` | — |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## Color Palette

### Core Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#b4c5ff` | Text on dark, links |
| Primary Container | `#2563eb` | CTA buttons, active highlights |
| Primary Fixed Dim | `#b4c5ff` | Hover states |
| Inverse Primary | `#0053db` | Alternate button fill |
| Secondary | `#a2e7ff` | Icon tints, badges |
| Secondary Container | `#00d2fd` | Neon Cyan — icons, glow dots, accents |
| Secondary Fixed Dim | `#3cd7ff` | Hover glow on secondary elements |
| Tertiary | `#4edea3` | Success states, completed steps, tags |
| Tertiary Container | `#007d55` | Success container background |

### Surfaces & Backgrounds

| Name | Hex | Usage |
|------|-----|-------|
| Background | `#111318` | Page background |
| Surface | `#111318` | Default surface |
| Surface Container Lowest | `#0c0e13` | Deepest background layer |
| Surface Container Low | `#1a1b21` | Subtle raised surface |
| Surface Container | `#1e1f25` | Cards, panels |
| Surface Container High | `#282a2f` | Elevated cards, modals |
| Surface Container Highest | `#33353a` | Tooltips, highest elevation |
| Surface Bright | `#37393f` | Bright surface variant |
| Surface Variant | `#33353a` | Alternate section backgrounds |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| On Background | `#e2e2e9` | Primary body text |
| On Surface | `#e2e2e9` | Text on surface elements |
| On Surface Variant | `#c3c6d7` | Secondary / caption text |
| On Primary | `#002a78` | Text on primary-colored elements |
| On Primary Container | `#eeefff` | Text inside primary containers |
| On Secondary | `#003642` | Text on secondary elements |
| On Tertiary Container | `#bdffdb` | Text on success containers |
| Inverse On Surface | `#2e3036` | Text on light inverse surfaces |

### Borders & Outlines

| Name | Hex | Usage |
|------|-----|-------|
| Outline | `#8d90a0` | Default borders, dividers |
| Outline Variant | `#434655` | Subtle card borders |

### Error / Warning

| Name | Hex | Usage |
|------|-----|-------|
| Error | `#ffb4ab` | Error text |
| Error Container | `#93000a` | Error backgrounds |
| On Error Container | `#ffdad6` | Text on error containers |

---

## Tailwind Config (Custom Color Tokens)

```js
colors: {
  'primary':                    '#b4c5ff',
  'primary-container':          '#2563eb',
  'primary-fixed':              '#dbe1ff',
  'primary-fixed-dim':          '#b4c5ff',
  'on-primary':                 '#002a78',
  'on-primary-container':       '#eeefff',
  'on-primary-fixed':           '#00174b',
  'on-primary-fixed-variant':   '#003ea8',
  'inverse-primary':            '#0053db',
  'secondary':                  '#a2e7ff',
  'secondary-container':        '#00d2fd',
  'secondary-fixed':            '#b4ebff',
  'secondary-fixed-dim':        '#3cd7ff',
  'on-secondary':               '#003642',
  'on-secondary-container':     '#005669',
  'on-secondary-fixed':         '#001f27',
  'on-secondary-fixed-variant': '#004e5f',
  'tertiary':                   '#4edea3',
  'tertiary-container':         '#007d55',
  'tertiary-fixed':             '#6ffbbe',
  'tertiary-fixed-dim':         '#4edea3',
  'on-tertiary':                '#003824',
  'on-tertiary-container':      '#bdffdb',
  'on-tertiary-fixed':          '#002113',
  'on-tertiary-fixed-variant':  '#005236',
  'error':                      '#ffb4ab',
  'error-container':            '#93000a',
  'on-error':                   '#690005',
  'on-error-container':         '#ffdad6',
  'background':                 '#111318',
  'on-background':              '#e2e2e9',
  'surface':                    '#111318',
  'surface-dim':                '#111318',
  'surface-bright':             '#37393f',
  'surface-variant':            '#33353a',
  'surface-container-lowest':   '#0c0e13',
  'surface-container-low':      '#1a1b21',
  'surface-container':          '#1e1f25',
  'surface-container-high':     '#282a2f',
  'surface-container-highest':  '#33353a',
  'on-surface':                 '#e2e2e9',
  'on-surface-variant':         '#c3c6d7',
  'inverse-surface':            '#e2e2e9',
  'inverse-on-surface':         '#2e3036',
  'outline':                    '#8d90a0',
  'outline-variant':            '#434655',
  'surface-tint':               '#b4c5ff',
}
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `DEFAULT` | `0.25rem` (4px) | Chips, small elements |
| `lg` | `0.5rem` (8px) | Buttons |
| `xl` | `0.75rem` (12px) | Cards, panels |
| `full` | `9999px` | Pills, badges, avatars |

---

## Spacing & Layout

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-7xl` = `80rem` (1280px) | Center-aligned with `mx-auto` |
| Horizontal padding | `px-8` = `2rem` | Applied to all sections |
| Section vertical padding | `py-24` = `6rem` | Top and bottom per section |
| Grid columns | 1 (mobile) → 2–3 (desktop) | Responsive via Tailwind breakpoints |

---

## Custom CSS Components

### `.glass-nav` — Glassmorphism Navigation Bar
```css
.glass-nav {
  background: rgba(17, 19, 24, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### `.kinetic-gradient` — Subtle Hero Background Glow
```css
.kinetic-gradient {
  background: radial-gradient(circle at 50% 50%, #2563eb15 0%, transparent 70%);
}
```

### `.data-pulse` — Neon Cyan Glow Dot
```css
.data-pulse {
  width: 8px;
  height: 8px;
  background: #00d2fd;
  border-radius: 9999px;
  box-shadow: 0 0 12px #00d2fd;
}
```

---

## Component Patterns

### Primary Button
```
Background: #2563eb | Text: #eeefff | Border-radius: 0.5rem (8px) | Padding: px-6 py-3
Hover: brightness up + subtle glow shadow in #2563eb40
```

### Secondary (Outlined) Button
```
Background: transparent | Border: 1px solid #2563eb | Text: #b4c5ff | Border-radius: 0.5rem
Hover: background #2563eb15
```

### Card
```
Background: #1e1f25 | Border: 1px solid #434655 | Border-radius: 0.75rem (12px)
Hover: border-color #2563eb | box-shadow: 0 0 16px #2563eb20
```

### Pill / Badge
```
Background: #1e1f25 or #2563eb20 | Border: 1px solid #434655 | Border-radius: 9999px
Text: #b4c5ff | Padding: px-3 py-1
```

### Icon Style
```
Library: Material Symbols Outlined
Color: #00d2fd (Neon Cyan) for primary icons | #b4c5ff (Primary) for nav/UI icons
Size: 24px standard, 20px small
```

---

## Page Sections Reference (Home Page)

| # | Section | Key Layout |
|---|---------|-----------|
| 1 | Fixed Glassmorphism Navbar | Flex row, logo left, links center-right, CTA far right |
| 2 | Hero | Split 2-col grid, headline + CTAs left, tech graphic right |
| 3 | What We Do Strip | Centered text + 3 horizontal pill badges |
| 4 | Core Services Grid | 3-col card grid (6 cards) |
| 5 | Problems We Solve | 2-col: problem list left, approach copy right |
| 6 | Featured Solutions | 2×2 card grid with gradient image backgrounds |
| 7 | Technology Stack | Icon/logo grid, hover brightening |
| 8 | Our Process | 5-step horizontal connected timeline |
| 9 | CTA Banner | Full-width with Electric Blue gradient overlay |
| 10 | Footer | 4-column grid: logo, nav links, services, social |

---

## Stitch Prompt Header (copy into every new screen prompt)

```
**DESIGN SYSTEM (REQUIRED) — PCE Technologies:**
- Platform: Web, Desktop-first, fully responsive
- Theme: Dark, futuristic, enterprise SaaS aesthetic
- Background: #111318 | Surface: #1e1f25 | Surface Alt: #33353a
- Primary Accent: #2563eb (Electric Blue) — buttons, links, active states
- Secondary Accent: #00d2fd (Neon Cyan) — icons, glow dots, badges
- Success: #4edea3 (Soft Emerald) — tags, completed states
- Text Primary: #e2e2e9 | Text Secondary: #c3c6d7
- Borders: #434655 (subtle) | Outline: #8d90a0
- Buttons: border-radius 8px, filled #2563eb primary, outlined secondary
- Cards: border-radius 12px, background #1e1f25, border #434655, hover glow #2563eb
- Fonts: Space Grotesk (headings) + Manrope (body) — Google Fonts
- Icons: Material Symbols Outlined, Neon Cyan (#00d2fd)
- Nav: Fixed glassmorphism bar (rgba(17,19,24,0.6) + blur(20px))
- Max width: 1280px (max-w-7xl), section padding: py-24 px-8
```
