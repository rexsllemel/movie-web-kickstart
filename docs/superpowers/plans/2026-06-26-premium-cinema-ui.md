# Premium Cinema UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the public movie website UI into a premium cinema experience without changing backend, data, routing, search, modal, or watch logic.

**Architecture:** Keep the existing Next.js App Router pages and shared React components. Apply the redesign through Tailwind classes, global CSS tokens, and presentation-only JSX structure in existing UI components.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/Radix primitives, lucide/custom icons, next/image.

## Global Constraints

- UI/UX-only redesign.
- Preserve existing service calls, stores, request definitions, route behavior, watch links, search behavior, and modal open/close logic.
- Do not modify `src/services/**`, `src/server/**`, `src/stores/**`, `src/enums/**`, `src/types/**`, API route files, or TMDB request construction.
- Use the premium cinema tokens: Reel Black `#06070A`, Screen Charcoal `#10131A`, Projector Mist `#E8E5DD`, Subtle Silver `#A8A29A`, Premiere Gold `#F5C451`, Curtain Red `#D33F49`.
- Keep labels consistent: `Play`, `More Info`, `Download`.
- Verify with `npm run typecheck` and `npm run build` when edits are complete.

---

### Task 1: Global Cinema Theme

**Files:**
- Modify: `src/styles/globals.css`

**Interfaces:**
- Consumes: Existing Tailwind CSS variable names.
- Produces: Updated color tokens and reusable cinema utility classes.

- [ ] **Step 1: Update root/dark CSS variables**

Set `:root` and `.dark` variables to dark cinema-friendly values while preserving existing variable names.

- [ ] **Step 2: Add reusable presentation utilities**

Add utilities for text balance, cinematic focus rings, reduced motion, and body background.

- [ ] **Step 3: Verify no logic files changed**

Run: `git diff -- src/services src/server src/stores src/enums src/types`
Expected: no diff output.

### Task 2: Header, Search, Footer

**Files:**
- Modify: `src/components/navigation/main-nav.tsx`
- Modify: `src/components/debounced-input.tsx`
- Modify: `src/components/main/site-footer.tsx`

**Interfaces:**
- Consumes: Existing `MainNav` props, `DebouncedInput` props, search store callbacks.
- Produces: Same components with updated presentation only.

- [ ] **Step 1: Restyle `MainNav`**

Keep existing handlers and state. Change layout/classes for translucent header, active nav state, mobile dropdown, and download action treatment.

- [ ] **Step 2: Restyle `DebouncedInput`**

Keep debounce and keyboard behavior. Make the input a rounded cinema search pill with better width and focus states.

- [ ] **Step 3: Restyle footer**

Keep disclaimer and builder link. Present as a quiet dark legal band.

### Task 3: Hero And Browsing Rows

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/shows-carousel.tsx`
- Modify: `src/components/shows-grid.tsx`
- Modify: `src/components/shows-skeleton.tsx`

**Interfaces:**
- Consumes: Existing `Hero`, `ShowsCarousel`, `ShowCard`, `ShowsGrid`, and `ShowsSkeleton` props.
- Produces: Same component exports and click behavior with refined UI.

- [ ] **Step 1: Restyle `Hero`**

Keep random show, modal store, popstate handler, and watch link behavior. Replace viewport-width typography with responsive Tailwind sizes and cinematic gradients.

- [ ] **Step 2: Restyle carousel shelves**

Keep scroll logic and `ShowCard` click behavior. Improve row titles, scroll buttons, card spacing, poster hover depth, and image overlay.

- [ ] **Step 3: Restyle grid and empty states**

Keep search loading and results behavior. Make grid spacing and no-results guidance match the cinema visual system.

- [ ] **Step 4: Restyle skeletons**

Keep exported component API. Match card shape and dark loading treatment.

### Task 4: Details Modal

**Files:**
- Modify: `src/components/shows-modal.tsx`

**Interfaces:**
- Consumes: Existing modal store, trailer fetch, YouTube options, mute/play handlers.
- Produces: Same dialog behavior with premium detail-sheet presentation.

- [ ] **Step 1: Restyle dialog shell**

Keep `Dialog`, `DialogContent`, `DialogTitle`, and `DialogDescription`. Update modal width, background, border, and responsive padding.

- [ ] **Step 2: Restyle media area and controls**

Keep image, YouTube, Play link, and mute behavior. Improve overlay gradient and action positioning.

- [ ] **Step 3: Restyle metadata/content**

Keep displayed data. Make title, match, year, language, overview, and genres wrap cleanly on mobile.

### Task 5: Root And Mobile App Pages

**Files:**
- Modify: `src/app/(front)/page.tsx`
- Modify: `src/app/(front)/mobile-app/page.tsx`

**Interfaces:**
- Consumes: Existing `WatchNowButton`, `PreDownload`, `DownloadNow`, screenshot arrays, swipe handlers.
- Produces: Same behavior with unified cinema presentation.

- [ ] **Step 1: Redesign root page**

Keep existing buttons. Replace generic feature cards with movie-first hero and concise benefit panels.

- [ ] **Step 2: Redesign mobile app page**

Keep carousel state, autoplay interval, swipe handlers, nav buttons, dot navigation, download button, and instruction images. Replace inline style layout with Tailwind classes.

### Task 6: Verification

**Files:**
- Inspect all modified files.

**Interfaces:**
- Consumes: Completed UI edits.
- Produces: Verified UI-only change set.

- [ ] **Step 1: Run typecheck**

Run: `npm run typecheck`
Expected: TypeScript succeeds or any failure is documented if pre-existing/unrelated.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: Next.js build succeeds or any failure is documented if environment-related.

- [ ] **Step 3: Confirm UI-only scope**

Run: `git diff -- src/services src/server src/stores src/enums src/types`
Expected: no diff output.

- [ ] **Step 4: Review final changed files**

Run: `git status --short`
Expected: only UI/spec/plan files changed.

