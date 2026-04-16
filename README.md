# Temporal Flow — Blog Family Starter Kit

A **pnpm monorepo** for running multiple interconnected Astro blogs from a single codebase, with a shared `blog-core` package powering everything.

**Live demo:** [temporalflow.org](https://temporalflow.org)

---

## What Is This?

Temporal Flow lets you run a *family* of connected blogs — each with its own look, content, and domain — while sharing a common component library. The blogs can optionally federate with each other, showing posts and updates across sites via RSS.

```
temporal-flow/
├── packages/
│   └── blog-core/          # Shared components, layouts, schemas, styles
├── apps/
│   └── Temporal-Flow/      # Your first blog (start here)
├── scripts/                # Deploy helpers
├── .github/workflows/      # CI/CD for GitHub Pages
├── package.json            # Root workspace
└── pnpm-workspace.yaml
```

---

## Quick Start

```bash
# 1. Fork this repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/temporal-flow.git
cd temporal-flow

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
# Open http://localhost:4321
```

---

## Configure Your Site

Edit `apps/Temporal-Flow/src/config/config.ts`:

```ts
export const siteConfig: SiteConfig = {
  title: "My Blog",
  themeColor: { hue: 145 },  // 0=red 145=green 220=blue 270=purple
  defaultTheme: LIGHT_MODE,
}

export const profileConfig: ProfileConfig = {
  name: "Your Name",
  bio: "Writer, thinker, maker.",
  links: [
    { name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/yourname" },
  ],
}
```

---

## Writing Posts

```bash
node scripts/new-post.js "My Post Title"
# → creates src/content/posts/YYYY-MM-DD-my-post-title.md
```

**Frontmatter:**
```yaml
---
title: "My Post"
published: 2024-03-15
description: "A short description."
tags: ["tutorial"]
category: "Guide"
---
```

---

## Adding a Second Site

```bash
cp -r apps/Temporal-Flow apps/my-travel-blog
# Update package name in apps/my-travel-blog/package.json
# Update hue/title in src/config/config.ts
# Add scripts to root package.json:
#   "dev:travel": "pnpm --filter @temporal-flow/my-travel-blog dev"
pnpm dev:travel
```

---

## Federation (Connecting Blogs)

Each site generates `/rss.xml`. To follow another Temporal Flow blog, click **Friends** in the sidebar and paste their RSS URL. Posts appear in your feed — no central server needed.

---

## Deploying

### GitHub Pages (included)

Push to `main` — GitHub Actions builds and deploys automatically via `.github/workflows/deploy.yml`.

For a **custom domain**: create `apps/Temporal-Flow/CNAME` containing your domain name.

### Cloudflare Pages

Set build command: `pnpm build` and output directory: `apps/Temporal-Flow/dist`.

---

## Architecture

- `packages/blog-core/` — shared components, layouts, schemas, styles
- `apps/Temporal-Flow/` — the starter site; fork this to create new sites
- Override any component by placing a file at the same path in your app

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| [Astro 5](https://astro.build) | Static site generator |
| [Svelte 5](https://svelte.dev) | Interactive components |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Pagefind](https://pagefind.app) | Full-text search |
| [pnpm](https://pnpm.io) | Package manager |

---

## License

[MIT](apps/Temporal-Flow/LICENSE.md) — fork freely, make it yours.
