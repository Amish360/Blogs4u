# Blogs4u, rebuilt as a static site

Migration & redesign plan · Next.js 15 → static

A working plan to take Blogs4u from a Prisma/Postgres-backed Next.js app to a fully static,
statically-exported site — content moved to MDX, dynamic auth removed, and the existing
component set redesigned in place rather than rebuilt from scratch.

- **Scope:** full static export, no server
- **Content:** Markdown/MDX in-repo
- **Account features:** removed
- **Design direction:** modern minimal / editorial

Legend used below: `KEEP` = restyle only, `REMOVE` = deleted, `NEW` = added.

---

## 00 · Why this is a rebuild-in-place, not a rewrite

Blogs4u today is a full-stack app: Next.js App Router pages call route handlers in
`src/app/api/*`, which run Prisma queries against Postgres and set an httpOnly JWT cookie
checked by `src/middleware.ts`. None of that can survive `next export` — a static build has no
server to run a route handler or verify a cookie on. So the plan below removes the backend and
account system outright, and keeps every visual component (navbar, footer, blog grid, cards,
carousel, hero) as the shell to redesign, rewired to read from static data instead of an API.

**What "keeping current components in place" means here:** the component files under
`components/` stay — same responsibilities, same names, same place in the tree. What changes is
(a) their internals get restyled per the design system in §05, and (b) any component that
currently fetches from Redux thunks hitting `/api/*` gets its data passed in as static props
instead.

---

## 01 · Target architecture

One build, no runtime server. Content and images live in the repo; every route is pre-rendered
to HTML at build time.

**Today**
- Next.js SSR/route handlers on a Node host (Vercel)
- Postgres via Prisma, queried per-request
- JWT cookie auth, verified in `middleware.ts`
- Redux Toolkit slices fetch blogs/authors/categories at runtime
- Cloudinary for uploaded images

**After**
- `next.config.ts` sets `output: "export"`
- Blogs, authors, categories as MDX/JSON in `content/`
- No auth, no cookies, no middleware, no API routes
- Data read at build time via `generateStaticParams` + a small content loader — Redux dropped
  for page data (see §04)
- Images committed to `public/` or referenced by static URL; `next/image` set to unoptimized for
  export

---

## 02 · Routes: keep vs. remove

| Route | Status | Note |
|---|---|---|
| `/` (home) | KEEP | Static, hero + latest posts pulled from content at build time |
| `/blogPage/[id]` | KEEP | `generateStaticParams` over all MDX slugs |
| `/author/[id]` | KEEP | Generated from author frontmatter, no live "blogs by author" query |
| `/Community`, `/Community/[id]` | KEEP | Same static treatment as blog pages |
| `/FAQ`, `/Support` | KEEP | Already static in content; just restyled |
| `/login`, `/Signup` | REMOVE | No auth backend to call |
| `/MyAccount`, `/MyAccount/EditProfile` | REMOVE | Depends on session + profile mutation API |
| `/MyBlogs`, `/createBlog` | REMOVE | Depends on authenticated write API |
| `/api/*` (all route handlers) | REMOVE | No server at runtime for a static export |
| `src/middleware.ts` | REMOVE | Nothing left to gate |
| `prisma/`, DB connection | REMOVE | Content moves to MDX — see §04 |

---

## 03 · Component inventory

Every one of these stays in the tree. "Restyle" means new spacing/type/color per §05 with the
same props contract; "rewire" means it also needs its data source swapped from a Redux thunk to
a static prop.

| Component | Action | Change needed |
|---|---|---|
| `navbar.tsx` | RESTYLE | Drop the logged-in username branch; keep the rest of the nav shell |
| `footer.tsx` | RESTYLE | Visual pass only |
| `herosection.tsx` | RESTYLE | Visual pass only |
| `blogsGrid.tsx` | REWIRE + RESTYLE | Read posts from static content list instead of a Redux/API fetch |
| `blogPostCarousel.tsx`, `carousel.tsx` | REWIRE + RESTYLE | Same — feed it a static "featured" list |
| `authors.tsx` | REWIRE + RESTYLE | Read from authors content collection |
| `communityCard.tsx` | RESTYLE | Visual pass only |
| `clientLayoutWrapper.tsx` | SIMPLIFY | Drop any auth-state branching it does around nav/footer |
| `components/ui/*` (button, card, input, avatar, label, radio-group, skeleton) | RESTYLE | Re-theme the shadcn/Radix primitives to the new tokens; keep the API surface |
| login/signup form components | REMOVE | No destination route left to render them on |
| `redux/slices/authSlice`, blogs/authors/categories thunks | REMOVE | Static props replace runtime fetching; see §04 |

---

## 04 · Content migration: DB → MDX

One-time export of the current Postgres tables into files, then a thin build-time loader that
replaces the Prisma queries the API routes used to run.

**Proposed structure**

```
content/
  blogs/
    my-first-post.mdx
    another-post.mdx
  authors/
    jane-doe.mdx
  categories/
    categories.json
```

**Blog frontmatter** (mirrors the current Prisma `Blog` model)

```
---
title: "..."
slug: "my-first-post"
author: "jane-doe"
category: "..."
coverImage: "/images/blogs/my-first-post.jpg"
publishedAt: "2026-08-01"
excerpt: "..."
---

MDX body content here.
```

- **Export script:** a one-off Node script reads the existing Postgres DB via Prisma (before
  it's removed) and writes one `.mdx` file per blog and one per author, mapping columns straight
  to frontmatter fields.
- **Loader:** a small `lib/content.ts` using `gray-matter` + `next-mdx-remote` (or
  `contentlayer`/`velite` if you want typed content) replaces every place a component currently
  calls a Redux thunk.
- **Images:** Cloudinary URLs get downloaded into `public/images/...` during the export script,
  or left as absolute Cloudinary URLs if you're fine keeping that one external dependency.
- **Redux Toolkit:** drop the store entirely if nothing else needs client state, or keep a
  trimmed store for pure UI state (e.g. a mobile nav toggle) with the data slices removed.

---

## 05 · Design system for the redesign

Tailwind v4 and the shadcn/Radix component layer stay — only the tokens change. Use this as the
palette/type/spacing reference while restyling each component in §03.

**Color**

| Token | Hex | Use |
|---|---|---|
| Paper | `#F1EFE7` | Background |
| Ink | `#20241F` | Primary text |
| Ink soft | `#565C52` | Secondary text |
| Accent — mustard | `#8A6D1F` | Status/meta, category tags |
| Accent — teal | `#2F5D62` | Links, active nav, primary buttons |
| Accent — rust | `#A14B3D` | Status/meta, "new" badges |

Paper + ink carry the reading experience; teal is the one interactive color (links, active nav,
primary buttons). Mustard and rust are reserved for status/meta use — category tags, "new"
badges — not decoration.

**Type**

| Role | Typeface | Use |
|---|---|---|
| Display | Fraunces | Post titles, hero |
| Body | IBM Plex Sans | Nav, body copy, cards |
| Utility / mono | IBM Plex Mono | Dates, tags, byline meta |

Body copy sits near 65 characters wide on the blog detail page. Fraunces carries personality at
large display sizes (H1/H2 on post titles and the homepage hero) without being used for running
text, where Plex Sans stays legible at 16px.

**Layout**

Reading-focused single column for post detail (max 68ch), responsive 2–3 column grid for
blog/community listing, generous vertical rhythm (24/40/64px scale) instead of the current
tighter spacing — matches the "modern minimal / editorial" direction picked for this redesign.

---

## 06 · Execution phases

Ordered so the site stays buildable at the end of each phase.

1. **Content export.** Write the Prisma → MDX export script, run it once against the current DB,
   commit the output under `content/`. Verify counts match the DB (blog count, author count,
   category count).
2. **Strip the backend.** Delete `src/app/api/*`, `src/middleware.ts`, `prisma/`, auth-related
   Redux slices and thunks, `login`/`Signup`/`MyAccount`/`MyBlogs`/`createBlog` routes. Remove
   `bcrypt`, `jsonwebtoken`/`jose`, `@nestjs/*`, `passport*`, `express`, `@prisma/client`,
   `prisma` from `package.json`.
3. **Static data loader.** Add `lib/content.ts` (MDX + frontmatter parsing), rewire `blogsGrid`,
   carousels, `authors.tsx`, and the detail pages to read from it via `generateStaticParams`/
   build-time props.
4. **Config for export.** Set `output: "export"` in `next.config.ts`,
   `images: { unoptimized: true }`, confirm no remaining dynamic route (`route.ts`,
   `middleware.ts`) or use of `headers()`/`cookies()` blocks the export.
5. **Redesign pass.** Apply the token system in §05 across the component inventory in §03:
   Tailwind config tokens first, then component-by-component restyle, starting with navbar/footer
   (seen on every page) then the post detail template, then listing/grid pages.
6. **Build & deploy.** `next build` produces static `out/`; deploy to GitHub
   Pages/Netlify/Cloudflare Pages. Add the corresponding CI workflow (none exists today).

---

## 07 · Risks & open calls

- **One-way door on content editing.** Once the DB is dropped, publishing a new post means
  adding an MDX file and rebuilding — there's no in-browser "createBlog" anymore. Confirm this
  workflow is acceptable before deleting Prisma.
- **Cloudinary images.** Decide before Phase 1 whether images get downloaded into `public/`
  (fully static, no external dependency) or left as Cloudinary URLs (keeps one external service
  alive).
- **Leftover auth scaffolding.** `express`, `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt` are
  in `package.json` but weren't confirmed wired into the Next app — worth a quick check before
  Phase 2 in case something outside `src/` depends on them.

---

*Blogs4u — static redesign plan. Reference doc, not a build script — work through phases 1–6 in
order.*
