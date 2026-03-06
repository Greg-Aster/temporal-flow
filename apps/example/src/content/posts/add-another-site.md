---
title: "How to Add Another Site to Your Blog Family"
published: 2024-02-01
description: "The Temporal Flow monorepo lets you run multiple connected blogs from one codebase."
tags: ["tutorial", "monorepo"]
category: "Guide"
---

# Adding a Second Site

One of the key features of Temporal Flow is that you can run multiple blogs
from a single monorepo — all sharing the same `blog-core` foundation.

## Steps

1. Copy `apps/example/` to `apps/my-new-site/`
2. Update the `package.json` name: `"@temporal-flow/my-new-site"`
3. Update `astro.config.mjs` with your new site's URL
4. Update `src/config/config.ts` — give it a unique hue color and title
5. Add root scripts in the top-level `package.json`:
   ```json
   "dev:my-new-site": "pnpm --filter @temporal-flow/my-new-site dev",
   "build:my-new-site": "pnpm --filter @temporal-flow/my-new-site build"
   ```
6. Add the new site to `pnpm-workspace.yaml` under `apps/*` (already covered if in `apps/`)

## Connecting Sites with Federation

Sites can share posts with each other using the **Friends** panel. Just add a
friend's RSS feed URL and their posts will appear in your feed.

Each site generates `/rss.xml` automatically — share that URL with friends!
