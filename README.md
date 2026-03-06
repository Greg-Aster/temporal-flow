# Temporal Flow — Blog Family Starter Kit

A **pnpm monorepo** for running multiple interconnected Astro blogs from a single codebase, with a shared `blog-core` package powering everything.

**Live demo:** [temporalflow.org](https://temporalflow.org)

---

## What Is This?

Temporal Flow lets you run a *family* of connected blogs — each with its own look, content, and domain — while sharing a common component library. The blogs can optionally federate with each other, showing posts and updates across sites via RSS.

**What's inside:**

```
temporal-flow/
├── packages/
│   └── blog-core/          # Shared components, layouts, schemas, styles
├── apps/
│   └── example/            # Your first blog (start here)
├── scripts/                # Deploy helpers
├── .github/workflows/      # CI/CD template
├── package.json            # Root workspace
└── pnpm-workspace.yaml
```

---

## Quick Start

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm 9+](https://pnpm.io/installation)

### 1. Fork and clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/temporal-flow.git
cd temporal-flow
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) — your blog is running!

---

## Configure Your Site

Open `apps/example/src/config/config.ts`. This is the main configuration file.

### Site settings

```ts
export const siteConfig: SiteConfig = {
  title: "My Blog",              // Browser tab title
  subtitle: "A personal site",   // Shown under the title
  lang: "en",                    // Site language
  themeColor: {
    hue: 145,                    // 0–360: 0=red, 145=green, 220=blue, 270=purple
    fixed: false,                // true = disable user hue picker
  },
  defaultTheme: LIGHT_MODE,      // LIGHT_MODE | DARK_MODE | AUTO_MODE
}
```

### Profile

```ts
export const profileConfig: ProfileConfig = {
  avatar: "/avatar/avatar.svg",  // Path under public/
  name: "Your Name",
  bio: "Writer, thinker, maker.",
  links: [
    { name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/yourname" },
    { name: "BlueSky", icon: "fa6-brands:bluesky", url: "https://bsky.app/profile/you.bsky.social" },
  ],
}
```

### Navigation

```ts
export const navBarConfig: NavBarConfig = {
  links: [
    0,          // Home (preset)
    1,          // Archive (preset)
    2,          // About (preset)
    3,          // RSS (preset)
    {           // Custom link with dropdown
      name: "Projects",
      url: "/archive/",
      dropdown: [
        { name: "Project Alpha", url: "/posts/project-alpha/" },
        { name: "External Link", url: "https://example.com", external: true },
      ],
    },
  ],
}
```

---

## Writing Posts

Create a Markdown or MDX file in `apps/example/src/content/posts/`:

```bash
node scripts/new-post.js "My Post Title"
# → creates src/content/posts/2024-03-15-my-post-title.md
```

**Post frontmatter:**

```yaml
---
title: "My Post Title"
published: 2024-03-15
description: "A short description shown in previews."
tags: ["tutorial", "astro"]
category: "Guide"
image: "/posts/my-post/cover.jpg"   # optional
draft: false                         # true = hidden from listing
---
```

### Quick Updates (Journal)

The sidebar can show a live updates feed. Edit `src/content/updates/my-updates.md`:

```yaml
---
title: "Updates"
journalTitle: "My Journal"
maxEntries: 5
current:
  status: "Working on something new"
  note: "Optional additional note"
---

## 2024-03-15 | Entry Title

Brief update content here.
```

---

## Adding a Second Site

One of the key features of Temporal Flow is running multiple blogs from one monorepo.

1. **Copy the example app:**
   ```bash
   cp -r apps/example apps/my-travel-blog
   ```

2. **Update `apps/my-travel-blog/package.json`:**
   ```json
   { "name": "@temporal-flow/my-travel-blog" }
   ```

3. **Update `apps/my-travel-blog/astro.config.mjs`** with your site URL

4. **Give it a unique color** in `src/config/config.ts`:
   ```ts
   themeColor: { hue: 145 }  // green for travel
   ```

5. **Add root scripts** to the top-level `package.json`:
   ```json
   "dev:travel": "pnpm --filter @temporal-flow/my-travel-blog dev",
   "build:travel": "pnpm --filter @temporal-flow/my-travel-blog build"
   ```

6. **Run it:**
   ```bash
   pnpm dev:travel
   ```

---

## Federation (Connecting Blogs)

Temporal Flow blogs can share content with each other — no central server needed.

Each site generates `/rss.xml` automatically. To follow another Temporal Flow blog:

1. Open your site in dev mode
2. Click **Friends** in the sidebar
3. Paste the RSS URL of any Temporal Flow blog: `https://other-site.example.com/rss.xml`
4. Their posts appear in your feed (client-side only, not stored on any server)

**To pre-configure friends** (shown by default to all visitors), add entries to `src/content/friends/`:

```yaml
---
name: "Friend's Blog"
url: "https://friend.example.com"
avatar: "https://friend.example.com/avatar.png"
rss: "https://friend.example.com/rss.xml"
---
```

---

## Deploying

### Cloudflare Pages (recommended)

1. Create a Cloudflare Pages project
2. Set build command: `pnpm build`
3. Set output directory: `apps/example/dist`
4. Add environment variables if needed

**With GitHub Actions CI/CD**, edit `.github/workflows/deploy.yml`:
```yaml
projectName: your-cloudflare-pages-project-name   # ← update this
directory: apps/example/dist                        # ← update if deploying a different app
```

Add these GitHub secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Multiple Sites with CI

To deploy multiple sites in one repo, add parallel jobs to the workflow:

```yaml
deploy-travel:
  # same pattern, different app name and output dir
  directory: apps/my-travel-blog/dist
  projectName: my-travel-blog-cf-pages
```

---

## Syncing Updates from Upstream

To pull in improvements to `blog-core` from the upstream Temporal Flow repo:

```bash
git remote add upstream https://github.com/Greg-Aster/temporal-flow.git
git fetch upstream
git merge upstream/main --allow-unrelated-histories
```

Or cherry-pick specific commits:

```bash
git cherry-pick <commit-hash>
```

---

## Architecture

```
packages/blog-core/
├── src/
│   ├── components/          # Astro + Svelte components
│   │   ├── client/          # Client-side interactive components
│   │   ├── post/            # Post rendering components
│   │   ├── svelte/          # Svelte islands (search, friends, TOC)
│   │   └── widget/          # Sidebar widgets
│   ├── layouts/             # Page layouts (Layout, MainGridLayout)
│   ├── schemas/             # Zod content collection schemas
│   ├── styles/              # Shared CSS (main.css, design system)
│   ├── types/               # TypeScript types
│   └── utils/               # Shared utilities
└── package.json             # @temporal-flow/blog-core

apps/example/
├── src/
│   ├── config/              # Site configuration (config.ts, banner.config.ts, etc.)
│   ├── content/             # Your content (posts, updates, friends, spec)
│   ├── pages/               # Astro pages (routes)
│   ├── components/          # App-specific component overrides
│   └── stores/              # Client-side state (friendStore, etc.)
├── astro.config.mjs
└── package.json             # @temporal-flow/example
```

**Key principle:** `blog-core` provides everything structural. Apps provide content and configuration. Override any component by creating a file at the same path in your app.

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| [Astro 5](https://astro.build) | Static site generator, Islands architecture |
| [Svelte 5](https://svelte.dev) | Interactive components |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Pagefind](https://pagefind.app) | Client-side full-text search |
| [pnpm](https://pnpm.io) | Fast, disk-efficient package manager |
| [Biome](https://biomejs.dev) | Linting and formatting |

---

## License

[MIT](LICENSE) — fork freely, make it yours.
