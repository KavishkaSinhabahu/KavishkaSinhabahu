# Kavishka Sinhabahu — Portfolio Website

A production-ready personal portfolio website built with Next.js 14, TypeScript, Tailwind CSS 4, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Geist (via next/font)
- **Theme:** next-themes (dark/light)
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── actions/          # Server Actions (contact form)
│   ├── globals.css       # Global styles & design tokens
│   ├── layout.tsx        # Root layout (SEO, fonts, providers)
│   └── page.tsx          # Home page (all sections)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, About, Experience, Projects, Skills, Contact
│   └── shared/           # ThemeToggle, SectionHeading
├── config/               # Animation presets
├── hooks/                # Custom hooks (useScrollDirection)
├── lib/                  # Utilities, data, fonts
├── providers/            # ThemeProvider
└── types/                # TypeScript interfaces
```

## Customization

All portfolio content (bio, projects, skills, experience, etc.) is centralized in `src/lib/data.ts` for easy editing.

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## License

© 2025 Kavishka Sinhabahu. All rights reserved.
