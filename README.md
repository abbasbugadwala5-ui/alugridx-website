# ALUGRIDX Website v2.0

Fresh build — clean white corporate design based on client reference.

## Setup

### Frontend
```bash
cd alugridx
npm install
cp .env.local.example .env.local
npm run dev        # → http://localhost:3000
```

### Backend
```bash
cd alugridx/server
npm install
cp .env.example .env   # set MONGODB_URI
npm run dev            # → http://localhost:5000
```

## Pages
| Route | Page |
|-------|------|
| `/` | Home (hero slider, products, why us, about, projects, catalogue) |
| `/about` | About — story, mission, values, quality |
| `/products` | Products with sidebar filter |
| `/projects` | Projects with tab filter |
| `/catalogue` | Catalogue request form |
| `/blog` | Blog & News |
| `/faq` | FAQ accordion |
| `/contact` | Contact form |

## Stack
- Next.js 14 App Router
- Tailwind CSS
- Swiper.js (hero slider, projects slider)
- Framer Motion ready
- Node.js + Express + MongoDB backend

## Colors
- Primary Blue: `#1A56DB`
- Navy: `#0D1B3E`
- Font Heading: Barlow (700, 800, 900)
- Font Body: Inter (300, 400, 500)
