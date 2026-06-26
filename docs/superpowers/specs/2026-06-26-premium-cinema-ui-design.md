# Premium Cinema UI Redesign

## Goal

Modernize the public movie website UI and UX into a premium cinema experience while preserving all existing backend, routing, data fetching, search, modal, and watch behavior.

## Scope

This is a UI/UX-only redesign. Changes are limited to styling, layout, responsive presentation, component structure where needed for presentation, and interface copy. Existing service calls, stores, request definitions, route behavior, watch links, search behavior, and modal open/close logic remain unchanged.

In scope:

- Global visual system in Tailwind/CSS variables.
- Public layout shell, header, navigation, footer.
- Home/root landing page presentation.
- Shared movie browsing surfaces: hero, carousel, cards, grid, skeleton/empty states.
- Show details modal presentation.
- Mobile app page presentation while preserving carousel/download behavior.

Out of scope:

- MovieService, TMDB request logic, API routes, tRPC, Firebase, environment config, ad/watch link behavior, sitemap/SEO logic, and backend code.
- New account, favorites, watchlist, recommendation, rating, or auth functionality.

## Visual Direction

The site should feel like a polished streaming cinema: immersive, dark, artwork-led, and easy to browse repeatedly. The UI should use TMDB posters and backdrops as the primary visual asset, with restrained cinematic accents rather than heavy decoration.

### Token System

Colors:

- `Reel Black` `#06070A`: main background.
- `Screen Charcoal` `#10131A`: panels, header, modal surfaces.
- `Projector Mist` `#E8E5DD`: primary text.
- `Subtle Silver` `#A8A29A`: secondary text and metadata.
- `Premiere Gold` `#F5C451`: primary accent for quality/rating/action hints.
- `Curtain Red` `#D33F49`: selective emphasis for active states and download/app moments.

Typography:

- Keep the existing Inter body font for readability.
- Keep the existing Cal Sans heading font, but use it with tighter hierarchy and less oversized generic marketing text.
- Use compact uppercase metadata sparingly for genre, match, year, and language labels.

Layout:

```text
Header: translucent cinema bar, solid on scroll
Hero: full-bleed backdrop + readable left content + action row
Rows: section title + horizontal poster rail
Cards: poster-first, stable aspect ratio, hover depth/title treatment
Modal: trailer/backdrop top, detail sheet below
Footer: quiet legal/disclaimer band
```

Signature element:

- A subtle "spotlight" treatment created through layered gradients over real movie backdrops and poster cards. This gives the site a cinematic identity without adding unrelated decorative artwork.

## Component Design

### Global Shell

Set the default public experience to dark cinematic surfaces. Body background should use deep black/charcoal with subtle radial or linear depth that does not overpower artwork. Text contrast must remain strong on both large screens and mobile.

The light theme can remain supported by tokens, but the redesign should make dark mode the intentional default feel of the movie site.

### Header And Navigation

The header should feel like a streaming app control bar:

- Sticky, translucent at page top, more opaque with shadow/border on scroll.
- Logo and site name are clearer but not oversized.
- Navigation links use quieter inactive states and a distinct active state.
- "Download App Now" should be visually treated as an action link, not just another long nav label.
- Mobile menu should feel integrated with the dark cinema palette.
- Search should expand smoothly into a usable pill input with enough width, visible focus, and a clear search icon.

No search logic changes are required.

### Hero

The hero remains powered by the existing random show. Presentation changes:

- Use a taller, more cinematic first viewport with full-bleed backdrop art.
- Add layered gradients for readability: left-to-right text protection and bottom fade into content rows.
- Improve title hierarchy with responsive type that does not rely on viewport-width text sizing.
- Show match score, year/date, and media language/type as compact metadata where available.
- Keep `Play` and `More Info` actions, but make them more polished and touch-friendly.
- Keep existing click behavior and modal/watch routing intact.

### Carousels And Cards

Rows should feel like curated shelves:

- Slightly stronger row titles with consistent left gutter.
- Improved horizontal spacing and stable poster card dimensions.
- Poster cards get subtle shadow, border, hover lift, and a soft overlay for title visibility.
- Hover effects should be refined on desktop and avoid layout shift.
- Mobile should prioritize easy horizontal swiping with comfortable card size.

The existing card click behavior and modal store usage remain unchanged.

### Grid And Search States

Search/grid pages should feel intentional:

- Better top spacing when the hero is hidden during search.
- Empty search state should be a centered dark panel with concise guidance.
- Grid cards should use the same poster card visual language as carousels.
- Loading skeletons should match the poster card shape and dark theme.

No search data flow changes are required.

### Details Modal

The modal becomes a premium detail sheet:

- Larger trailer/backdrop top with stronger gradient into controls.
- Cleaner action row with prominent Play button and circular mute control.
- Better title, metadata, genre, and overview spacing.
- Mobile content should avoid cramped horizontal rows and use wrapping metadata.
- Dialog should retain accessible title/description and existing trailer fetch behavior.

### Root Landing Page

The `/` page currently reads like a generic features landing page. Redesign it as a movie-first entry:

- First screen should feature the site name, cinema-style background/image treatment, and primary actions to watch/download.
- Feature blocks should be rewritten and styled as concise benefit panels, not generic marketing cards.
- Keep existing buttons and links.

### Mobile App Page

Restyle the mobile app page to match the cinema system:

- Replace inline-style-heavy layout with Tailwind classes.
- Use a stronger app-download hero, phone screenshot gallery, and installation steps.
- Preserve auto-play, swipe, previous/next, dot navigation, and download behavior.
- Make installation steps easier to scan on mobile.

## Responsive UX

Desktop:

- Header, hero, and rows should feel spacious and cinematic.
- Hover states can reveal extra polish.
- Carousels should remain scannable with clear controls.

Tablet:

- Hero content should remain readable over artwork.
- Cards should keep stable poster ratio.
- Navigation/search should not crowd.

Mobile:

- Hero should not bury actions below the fold.
- Header menu and search should be touch-friendly.
- Modal content should stack cleanly.
- Buttons and carousel controls must not overlap poster content.

## Accessibility And Interaction

- Preserve semantic labels already present.
- Maintain visible keyboard focus on buttons, inputs, nav links, and dialog controls.
- Avoid text over artwork without sufficient gradient protection.
- Respect reduced-motion where feasible for purely decorative transitions.
- Keep button labels consistent: `Play`, `More Info`, `Download`.

## Implementation Boundaries

Allowed files are expected to be primarily:

- `src/styles/globals.css`
- `src/app/(front)/layout.tsx`
- `src/app/(front)/page.tsx`
- `src/app/(front)/mobile-app/page.tsx`
- `src/components/hero.tsx`
- `src/components/shows-carousel.tsx`
- `src/components/shows-grid.tsx`
- `src/components/shows-modal.tsx`
- `src/components/shows-skeleton.tsx`
- `src/components/main/site-header.tsx`
- `src/components/main/site-footer.tsx`
- `src/components/navigation/main-nav.tsx`
- UI primitive class usage where needed

Avoid changes to:

- `src/services/**`
- `src/server/**`
- `src/stores/**`
- `src/enums/**`
- `src/types/**`
- API route files
- TMDB request construction
- watch page player logic unless only presentation is clearly required

## Verification

Before completion:

- Run typecheck or build if available.
- Inspect changed files for accidental backend/data edits.
- If a dev server can run, visually check home, movies, search, modal, and mobile app pages on desktop and mobile widths.
- Confirm search still opens, modal still opens, Play links still point to the same watch routes, and carousel/card clicks still behave as before.

