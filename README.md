# Big 8 Intergrated, LLC — Website (V1)

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion.
Built per the V1 architecture brief — see `src/config/theme.ts` for the design
token reference and `src/lib/services/` for the data layer.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build         # production build
npm run lint           # ESLint
npm run format          # Prettier (writes)
npm run format:check   # Prettier (check only)
```

## ⚠️ Placeholder content

Most of the copy and imagery on this site is intentionally fake, clearly
labeled `PLACEHOLDER` in the source. Real content is needed for:

| File | What's missing |
|---|---|
| `src/data/industries.ts` | Divisions 4–8 (only 3 of 8 are real) |
| `src/data/products.ts` | Entire product catalog (no real products yet) |
| `src/data/brands.ts` | Entire brand/partner list |
| `src/data/homepage.ts` | Hero headline/subheadline, trusted-industries sectors, why-choose-us points |
| `src/data/company.ts` | Stats (years in business, clients served, states served) |
| `public/images/products/`, `public/images/brands/` | Real photos/logos — currently generated placeholder images |

Every consumer of this data reads through `src/lib/services/`, so replacing
the arrays in `src/data/` is enough — no component changes needed.

## Project structure

```
src/
  app/                → routes (App Router)
  components/
    ui/                → shadcn primitives (Button, Card, Badge)
    layout/            → Navbar, Footer
    cards/             → IndustryCard, ProductCard, BrandCard, FeatureCard
    common/             → Container, Section, SectionHeader, Cta, Reveal, ComingSoon
  features/home/       → homepage section components (Hero, About, etc.)
  lib/
    services/           → data-access layer (swap to Supabase here later, not in components)
    utils.ts             → cn() helper
  types/content.ts       → shared content shapes
  data/                   → the actual content arrays (see table above)
  config/theme.ts          → JS/TS mirror of the design tokens in globals.css
```

## Design tokens

The canonical source is `src/app/globals.css` (`:root` custom properties,
exposed to Tailwind via `@theme inline`). Change a color/radius/shadow/duration
there and it updates everywhere. `src/config/theme.ts` mirrors the same values
for the few JS-only contexts (Framer Motion variants) that can't read a CSS
variable directly — keep the two in sync if you edit one.

## Deploying

Not yet deployed anywhere. To ship to Vercel: push this to a GitHub repo,
import it in Vercel, and set the framework preset to Next.js (auto-detected).
No environment variables are required for V1 — see `.env.example` for what
future phases (Supabase, Cloudinary, Stripe) will need.
