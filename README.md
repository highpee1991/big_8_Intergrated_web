# Big 8 Integrated , Website

## 1. Project Overview

Big 8 Integrated is a multi-division industrial supplier: one company
operating across (at least) 8 sectors , oil & gas equipment, heavy equipment
(tractors, forklifts, etc.), IT, and medical equipment confirmed so far, with
4 more divisions to be added once the client confirms them.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | React-based, but adds file-based routing, server-side rendering, and built-in image/font optimization , all of which matter for a corporate site that needs to load fast and rank in search. Plain React (client-only) can't do SSR without extra tooling. |
| Language | **TypeScript** | Catches mistakes (wrong prop types, typos in data) at build time instead of in front of a client. |
| Styling | **Tailwind CSS** | Utility classes, but every color/font is driven by CSS variables (see §5), so the whole site restyles from one place instead of hunting through components. |
| Icons | **lucide-react** | Lightweight, consistent icon set (menu, phone, mail, etc.) , no separate image assets needed for icons. |
| Hosting | **Vercel** | Built by the same team as Next.js; zero-config deploys straight from GitHub, automatic HTTPS, and a global CDN so the site is fast from anywhere. |
| Version control | **GitHub** | Where the code lives; every push to `main` auto-deploys to Vercel. |
| Domain | **GoDaddy** (already purchased) | DNS is pointed at Vercel , GoDaddy just handles the domain registration, Vercel handles serving the site. |

**Deliberately not added yet** (planned for later phases, once there's real
content/features that need them):
- **Supabase** (Postgres database) , for structured content (products,
  divisions, projects, testimonials) once it needs to be editable without a
  code change.
- **Cloudinary** , for image hosting/optimization once there are real
  product/equipment photos to manage at scale, instead of static files in
  `/public`.
- **Auth, cart, checkout** , explicitly future scope (Version 2+), not part
  of the corporate-site launch.

Adding a backend now, before there's real content to manage, would slow down
today's launch for no benefit , everything it would do, a plain data file
already does at this stage.

---

## 3. Project Structure

```
big8-integrated/
├── public/
│   └── logo.png              # company logo, used in Navbar/Footer/Hero
├── src/
│   ├── app/                  # every folder here = a URL (see §6)
│   │   ├── layout.tsx        # wraps every page: fonts, Navbar, Footer
│   │   ├── globals.css       # ALL design tokens (colors/fonts) live here
│   │   ├── page.tsx          # homepage → "/"
│   │   ├── about/page.tsx    # → "/about" (placeholder)
│   │   ├── industries/page.tsx  # → "/industries" (placeholder)
│   │   ├── products/page.tsx    # → "/products" (placeholder)
│   │   └── contact/page.tsx     # → "/contact" (placeholder)
│   ├── components/
│   │   ├── layout/           # Navbar, Footer , used on every page
│   │   ├── home/             # Hero, Stats, DivisionsGrid, WhyUs, CTA
│   │   └── ui/                # Button, Badge, Container, WorkInProgress ,
│   │                          # small reusable pieces used across sections
│   └── lib/
│       └── constants.ts      # ALL editable content: company info, the
│                              # 8 divisions, homepage stats
├── tailwind.config.ts        # maps Tailwind classes to the CSS variables
├── package.json
└── README.md
```

The rule of thumb: **content** changes happen in `lib/constants.ts`,
**color/font** changes happen in `app/globals.css`, and **new pages** are new
folders under `app/`.

---

## 4. What's Built So Far (Homepage phase)

- Responsive Navbar with mobile hamburger menu
- Responsive Footer with nav links, division list, and contact info
- Homepage sections: Hero, Stats strip, Divisions grid (all 8, numbered,
  4 marked "Coming soon"), Why Us, closing CTA
- Placeholder "Work in Progress" pages for About / Industries / Products /
  Contact, so every nav link goes somewhere real
- A single global design-token system for color and typography (§5)

## 5. The Global Styling System

Every color and font is defined **once**, in `src/app/globals.css`, as a CSS
variable:

```css
--color-blue: 47 111 237;   /* primary buttons/links */
--color-red: 229 52 43;
--color-amber: 245 166 35;
--color-green: 47 168 79;
--color-navy: 11 28 44;     /* dark sections */
--color-paper: 246 247 249; /* page background */
```

`tailwind.config.ts` maps Tailwind classes like `bg-brand-blue` or
`text-navy` to those variables. **No component ever hardcodes a hex color.**
To restyle the entire site, change a value in `globals.css` , e.g. swapping
the primary color to green is a one-line change (`--color-blue: 47 168 79;`)
and every button, link, and accent using `brand-blue` updates everywhere,
instantly. Fonts work the same way via `--font-display` / `--font-body` /
`--font-mono`, set once in `layout.tsx`.

## 6. Next.js, for a React Developer

You already know components, hooks, and JSX. Here's what's different:

- **File-based routing.** No `react-router`. Every folder inside `src/app/`
  becomes a URL, and the `page.tsx` inside it is what renders there. Want a
  new page later, e.g. `/blog`? Create `src/app/blog/page.tsx`.
- **`layout.tsx` wraps every page.** It renders the Navbar and Footer once;
  every `page.tsx` is injected as `children`. You never re-import
  Navbar/Footer per page.
- **Server Components by default.** Every component renders on the server
  unless you add `"use client"` at the top of the file , new vs. plain React,
  which is 100% client-side. We only mark a component `"use client"` when it
  needs browser interactivity , e.g. `Navbar.tsx` uses `useState` for the
  mobile menu. Everything else stays a Server Component: faster, better SEO.
- **`next/image` instead of `<img>`.** Auto-optimizes and lazy-loads images.
- **`next/font`** loads Google Fonts at build time , no render-blocking
  `<link>` tags, no layout shift.
- **The `@/` import alias** points at `src/`. `@/components/ui/Button` means
  `src/components/ui/Button.tsx`.
