# Design Specification: Modern Editorial Performance (AnekaNews.com)

**Role**: Senior UI/UX Designer, Frontend Performance Engineer, & Technical SEO Engineer  
**Target Site**: https://anekanews.com  

---

## 1. Visual & Color System Tokens

```css
:root {
  /* Color Palette - Modern Editorial Performance */
  --color-primary: #0b1220;         /* Deep Navy Masthead & Primary Text */
  --color-primary-soft: #1e293b;    /* Slate Dark Surface */
  --color-accent: #2563eb;          /* Electric Blue Links & Badges */
  --color-accent-hover: #1d4ed8;    /* Deep Electric Blue */
  --color-background: #ffffff;      /* Pure White Page Background */
  --color-surface: #f8fafc;         /* Ultra-light Slate Card Background */
  --color-surface-hover: #f1f5f9;   /* Light Slate Hover */
  --color-text: #0f172a;            /* Almost Black High-Contrast Body Text */
  --color-text-muted: #64748b;      /* Slate Secondary Text */
  --color-border: #e2e8f0;          /* Clean Subdued Border */
  --color-border-dark: #334155;     /* Dark Border for Masthead */
  
  /* Typography Scale */
  --font-family-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-family-heading: "Inter", system-ui, -apple-system, sans-serif;
}
```

---

## 2. Header Architecture (3-Tier Layout)

### Tier 1: Utility Bar (Desktop / Tablet)
- Height: 32px
- Background: `#0b1220` with subtle border
- Left: Date in Indonesian format (`Minggu, 26 Juli 2026`).
- Right: Quick Links (`Tentang Kami`, `Kontak`, `Pedoman Media`, `Kebijakan Editorial`).

### Tier 2: Masthead
- Height: 64–72px
- Left: Logo `ANEKANEWS` (Clean typography with electric blue dot/accent).
- Center/Right: Quick Search Button & Mobile Hamburger Menu trigger (44×44px touch targets).

### Tier 3: Category Navigation & Terkini Bar
- Category Links: `Terbaru`, `Rumah & Properti`, `Olahraga`, `Teknologi`, `Bisnis`, `Gaya Hidup`.
- Information Bar: Replaces continuous marquee with a clean **Terkini** headline pill displaying 1 single active headline link.

### Mobile Navigation Drawer
- Hamburger button triggers a lightweight side-drawer overlay.
- Keyboard accessible (`Escape` key closes, body scroll lock `body.menu-open`).

---

## 3. Homepage Controlled Editorial Bento Grid

### Hero Section (Controlled Editorial Bento)
- **Desktop Grid**: 
  - **Main Story (65% width)**: High impact card with `loading="eager"` image, category badge, title, 2-line excerpt, author & reading time metadata.
  - **Secondary Stories (35% width)**: Vertical list of 3 side highlight articles with compact thumbnails (16:9 ratio).
- **Mobile Layout**: Stacks main story 100% full width followed by compact vertical list. No carousels, no layout shifts.

### Topic Chips Section
- Interactive topic chips: `#Properti`, `#Padel`, `#Fasilitas Olahraga`, `#AI Bisnis`, `#Teknologi`, `#UMKM`.

### Editorial Category Sections Order
1. **Rumah & Properti** (Featured horizontal card + grid items)
2. **Olahraga**
3. **Teknologi**
4. **Bisnis**
5. **Gaya Hidup**
- Strictly displays matching category articles. Hides empty sections gracefully.

---

## 4. Neo Editorial Article Layout (`/artikel/[slug]`)

- **Reading Container Width**: `680px - 760px` centered for maximum reading comfort.
- **Header Metadata**: Category eyebrow, H1 title, lead excerpt, author avatar & bio, publication & modification date, reading time.
- **Hero Image**: Optimized LCP image with `loading="eager"` and `fetchpriority="high"`.
- **Reading Progress Bar**: Minimalist 2px electric blue progress bar at top of viewport.
- **Copy Link & Share Tools**: Clean SVG action bar for copying article link.
- **Author Bio Box & Sources**: Rendered below article body with verified primary sources list.

---

## 5. Performance, SEO, & AdSense Readiness

- **CLS & Layout Stability**: Fixed image aspect ratios (16:9, 4:3, 1:1) with explicit CSS aspect-ratio definitions.
- **Ad Slots**: Non-disruptive ad container placeholders (`ad-slot-container`) with fixed min-height to eliminate CLS when AdSense is active. Completely hidden/empty when `ADSENSE_ENABLED` is false.
- **No Heavy Libraries**: Native CSS grid & flexbox, zero external animation frameworks, zero jQuery/Bootstrap/Tailwind dependencies.
