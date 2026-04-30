# Project Architecture & Development Guide

## Component Architecture (Atomic Design)

### Atoms (Basic Building Blocks)
- `/components/ui/`: Button, Input, Textarea, Badge, Card - Pure UI components with no business logic
- Each atom must be fully accessible with proper ARIA labels
- Atoms accept `className` for customization while maintaining consistent base styles

### Molecules (Composite Components)
- `/components/sections/`: HeroSection, AboutSection, ExperienceSection - Combinations of atoms
- Molecules handle their own animation variants via Framer Motion
- Data fetching managed at this level when needed

### Organisms (Complex Sections)
- `/app/page.tsx`: Page-level composition of molecules
- Layout components: Navbar, Footer
- Organisms orchestrate data flow and section ordering

## Visual Design System (Royal Blue & Slate)

### Color Palette (Clean Dashboard - SINGLE SOURCE OF TRUTH)
```css
:root {
  --color-background: #f8fafc;   /* Slate-50 - Main background */
  --color-foreground: #0f172a;   /* Slate-900 - Headings */
  --color-surface: #f1f5f9;     /* Slate-100 - Secondary surfaces */
  --color-card: #ffffff;         /* Pure White - Cards */
  --color-accent: #2563eb;       /* Royal Blue-600 - Primary actions */
  --color-accent-hover: #1d4ed8; /* Royal Blue-700 - Hover states */
  --color-text: #0f172a;         /* Slate-900 - Body text */
  --color-text-muted: #64748b;   /* Slate-500 - Muted text */
  --color-border: #e2e8f0;       /* Slate-200 - Borders */
}
```

### Hero Section (Royal Blue Gradient)
- Background: `bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800`
- All text in hero: `text-white` (Pure white, bold)
- Decorative circles: White at 5-10% opacity with blur

### Micro-Interactions (Framer Motion)
- Staggered children: `staggerChildren: 0.1, delayChildren: 0.3`
- Hover scale on cards: `whileHover={{ scale: 1.02 }}`
- Magnetic CTA: Spring physics with `type: "spring", stiffness: 400`
- Page transitions: `AnimatePresence` with exit animations`

### Visual Depth
- Cards: `bg-white border border-slate-200 rounded-2xl shadow-sm`
- Shadows: `shadow-sm` with `hover:shadow-md` transitions
- NO glow effects, NO dark mode - light theme only`

### Text Visibility Rules
- **NEVER use Royal Blue for body text - only for buttons and accents**
- Headings: `text-slate-900` (Bold, maximum contrast)
- Body text: `text-slate-600`
- Muted text: `text-slate-500`
- Hero text: `text-white` on blue gradient background
- CTAs only: Use Blue-600 background with **BOLD WHITE TEXT** (`font-bold text-white` via inline styles)

## State Management & Data Fetching

### Current Implementation
- Static JSON data files in `/app/data/`
- Client-side state via `useState` for forms
- No external state management library needed for static portfolio`

### Performance Optimization
- All data files are statically imported at build time
- Use `React.lazy()` for code splitting if dynamic imports needed
- TanStack Query NOT required (static data, no fetching)

## Security & Database (If Supabase Added Later)
- Enable RLS (Row Level Security) on all tables
- Create performance indexes on frequently queried columns
- Use service role only for admin operations
- Validate all inputs on both client and server side`

## Data Visualization Standards
- Use Indigo palette for all chart elements
- Custom tooltips showing context (years of experience, project count)
- Responsive containers with `ResponsiveContainer` from Recharts
- Clean bars with proper contrast ratios`

## Conversion & SEO Optimization`

### Contact Form
- Schema validation for all fields
- Real-time error feedback via state management
- Success/error states with clear user messaging`

### Lighthouse Targets
- Performance: 100/100 (lazy loading, WebP images, minimal JS)
- Accessibility: 100/100 (ARIA labels, keyboard nav, focus states)
- SEO: 100/100 (meta tags, semantic HTML, sitemap.xml)
- Best Practices: 100/100 (HTTPS, no console errors)`

### Hero Copy Guidelines
- Focus on VALUE provided to organizations
- Use action-oriented language ("Delivered", "Achieved", "Improved")
- Quantify impact with percentages, dollar amounts, time saved
- Keep it under 2 sentences for maximum impact`

## Build & Deployment`
- Static export: `next build && next export`
- Environment variables for EmailJS must be prefixed with `NEXT_PUBLIC_`
- Run `npm run build` before every commit to catch TypeScript errors
- Use `eslint` and `prettier` for code consistency`

## Strict Rules (NO EXCEPTIONS)
1. NEVER use Royal Blue (#2563eb) for paragraph text - only for buttons and accents
2. ALL buttons must use Blue-600 with **BOLD WHITE TEXT** (`style={{ color: '#ffffff', fontWeight: 'bold' }}`)
3. NO green (emerald), NO neon, NO dark mode - maintain Royal Blue & Slate palette
4. Cards: Pure White (#ffffff) with `border-slate-200 rounded-2xl shadow-sm`
5. Hero MUST use `bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800`
6. Animations must respect `prefers-reduced-motion`
7. Contact form MUST have Zod validation and clear success/error messages
8. **Royal Blue & Slate is the ONLY color system** - no greens, no neons, no dark surfaces`
