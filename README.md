# Arun Das — Portfolio (React + Vite)

A production-grade React portfolio with animated cursor, particle background, project detail pages, inline PDF certificate viewer, social media section, and skill-to-project mapping tooltips.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Assets — What You Need To Add

Place all your own files inside the `public/assets/` folder:

### Your Photo
```
public/assets/img/me.jpg          ← Your profile photo (shown on hero)
```

### Project Videos (demo recordings)
```
public/assets/videos/object-detection-demo.mp4
public/assets/videos/credit-default-demo.mp4
public/assets/videos/innerforge-demo.mp4
```
> If a video file is missing, the page shows a placeholder automatically.

### Project Screenshots (optional fallback)
```
public/assets/img/projects/object-detection.png
public/assets/img/projects/credit-default.png
public/assets/img/projects/innerforge.png
```

### Academic Certificates (PDF — shown inline without clicking)
```
public/assets/certificates/mca-certificate.pdf
public/assets/certificates/bca-certificate.pdf
public/assets/certificates/hsc-certificate.pdf
public/assets/certificates/sslc-certificate.pdf
public/assets/certificates/cloud-workshop.pdf
public/assets/certificates/code-crusade.pdf
```

### Project Reports (PDF)
```
public/assets/reports/object-detection-report.pdf
public/assets/reports/credit-default-report.pdf
```
> Rename your existing PDFs to match these names, or update `src/data/projects.js`.

### Resume
```
public/assets/Arun_Das_Resume.pdf
```

### Social Media Screenshots
```
public/assets/social/github.png      ← Screenshot of your GitHub profile
public/assets/social/linkedin.png    ← Screenshot of your LinkedIn profile
public/assets/social/hackerrank.png  ← Screenshot of your HackerRank profile
```

---

## ✏️ Customisation

| File | What to edit |
|------|-------------|
| `src/data/projects.js` | Project titles, descriptions, GitHub/live links, tech stack, results |
| `src/data/academics.js` | School/college names, years, grades, locations, certificate paths |
| `src/data/skills.js` | Skills list and which projects each skill is used in |
| `src/data/social.js` | Social media handles, URLs, descriptions |
| `src/components/Contact.jsx` | Email, phone, social links |
| `src/components/Hero.jsx` | Hero text, availability status |

### Update your live project links
In `src/data/projects.js`, fill in the `live` field for each project:
```js
live: 'https://your-deployed-site.vercel.app',
```

---

## 🌐 Deployment

This project is a standard Vite + React SPA (client-side routing via `react-router-dom`'s `BrowserRouter`). It's ready to deploy as-is on any static host. `vercel.json` and `netlify.toml` are already included so that deep links like `/project/innerforge` don't 404 on refresh.

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main

npm run deploy   # builds and pushes dist/ to the gh-pages branch
```
Then in GitHub → Settings → Pages, set the source to the `gh-pages` branch.
- If deploying to `https://<user>.github.io/` (a user/org page), keep `vite.config.js`'s `base: '/'` and `package.json`'s `homepage` as-is.
- If deploying to `https://<user>.github.io/<repo-name>/` (a project page), change `base` in `vite.config.js` to `'/<repo-name>/'` and update `homepage` in `package.json` to match — otherwise assets will 404.
- `404.html` is already set up with the SPA redirect trick GitHub Pages needs for client-side routing.

### Vercel
1. Push this project to a GitHub repo (see steps above, minus `npm run deploy`).
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite (auto-detected). Build command `npm run build`, output directory `dist` (auto-detected).
4. Deploy. `vercel.json` handles SPA routing automatically.

### Netlify
1. Push this project to a GitHub repo.
2. Go to netlify.com → Add new site → Import an existing project → pick the repo.
3. Build command and publish directory are already set via `netlify.toml` (`npm run build` → `dist`).
4. Deploy.

### Any other static host (Cloudflare Pages, Render, S3+CloudFront, etc.)
Run `npm run build`, then upload the contents of `dist/` — just make sure the host rewrites all unknown routes to `/index.html` (same idea as `vercel.json`/`netlify.toml` above) so `/project/:id` works on a hard refresh.

---

## 📦 Project Structure

```
portfolio-react/
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── img/           ← me.jpg, project screenshots
│       ├── videos/        ← demo videos (.mp4)
│       ├── certificates/  ← PDF certificates
│       ├── reports/       ← PDF project reports
│       ├── social/        ← Social media screenshots
│       └── Arun_Das_Resume.pdf
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx    ← Lag-free custom cursor
│   │   ├── ParticleBackground.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx          ← Hover skill → see project usage
│   │   ├── Projects.jsx
│   │   ├── Academics.jsx       ← Inline PDF viewer
│   │   ├── Certifications.jsx
│   │   ├── SocialMedia.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── projects.js
│   │   ├── academics.js
│   │   ├── skills.js
│   │   └── social.js
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProjectDetail.jsx   ← Video + details side-by-side
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## Features

- ✅ **Lag-free custom cursor** — RAF-based, zero CSS transition lag
- ✅ **Animated particle background** — canvas-based, 60fps
- ✅ **Project detail pages** — demo video on left, full details on right
- ✅ **Skill tooltips** — hover any skill to see which project & where it's used
- ✅ **Inline PDF viewer** — certificates expand in-place without opening a new tab
- ✅ **Social media section** — screenshot + description for each platform
- ✅ **Academic timeline** — location details, map links, inline certificate PDFs
- ✅ **Scroll reveal animations** — Intersection Observer, no library needed
- ✅ **3D photo tilt** — mouse-tracked perspective transform on hero photo
- ✅ **Fully responsive** — mobile-first, works on all screen sizes
- ✅ **React Router** — `/project/:id` for each project detail page
