# Aggressive SEO Design

## Goal

Improve organic search visibility for To Play Movies across brand, competitor-alternative, category, and long-tail movie/TV title searches. The implementation should be aggressive in coverage but avoid spam patterns such as keyword stuffing, duplicate metadata, doorway pages, or misleading claims.

## Search Positioning

The site should consistently describe itself as a place to watch movies, TV shows, anime, and new releases online, with natural references to being an FMovies and 123movies alternative. Competitor terms should appear in titles and descriptions only where they help users understand the product.

Primary search themes:

- To Play Movies
- watch free movies online
- watch TV shows online
- anime movies and anime TV shows
- FMovies alternative
- 123movies alternative
- mobile movie app
- individual movie and TV show title pages

## Architecture

### Global Metadata

Use Next.js App Router metadata as the single source of truth. Remove the duplicated manual title, description, keywords, canonical, Open Graph, and Twitter meta tags from the root layout head. Keep scripts, manifest, favicon links, and required ad/verification tags where needed.

Global metadata should define:

- metadata base from `NEXT_PUBLIC_APP_URL`
- default title and title template
- global description
- focused keyword set
- canonical root URL
- Open Graph and Twitter defaults
- robots indexing preferences
- app icons and manifest

### Page Metadata

Add page-level metadata for important indexable pages:

- `/`
- `/home`
- `/movies`
- `/tv-shows`
- `/anime`
- `/new-and-popular`
- `/mobile-app`
- `/search`

Each page should have a unique title, description, canonical URL, and Open Graph/Twitter overrides. Titles should be readable and search-focused, not repetitive.

### Movie and TV Detail Metadata

Improve `handleMetadata()` so title pages generate stronger metadata from TMDB data:

- title pattern: `Watch <Title> Online Free | To Play Movies`
- type-aware title copy for movies and TV shows
- description based on TMDB overview with a fallback when overview is missing
- canonical URL for the current detail page
- poster/backdrop image fallback chain
- TMDB keyword enrichment plus controlled site keywords
- Open Graph and Twitter metadata using the best available artwork

If TMDB data cannot be fetched, metadata should still produce valid, indexable fallback values derived from the slug and site config.

### Structured Data

Add JSON-LD for:

- `WebSite` with a SearchAction pointing to `/search?q={search_term_string}`
- `Organization` or `WebSite` publisher identity for the brand
- `Movie` or `TVSeries` on detail pages when TMDB data exists

Structured data should be rendered in server components to avoid relying on client-side hydration for crawlers.

### Sitemap and Robots

Update custom sitemap routes to improve crawl quality:

- fix the `urlset` namespace to `http://www.sitemaps.org/schemas/sitemap/0.9`
- include all key static pages, including `/anime`, `/mobile-app`, and `/search`
- add `lastmod`, `changefreq`, and `priority`
- preserve dynamic TMDB title URLs
- keep sitemap index pages bounded to TMDB pagination limits

Ensure `robots.txt` points to the sitemap index and does not block important routes.

### Indexable Content

Add concise indexable copy to major catalog pages. The copy should explain what users can browse on that page and naturally include high-value terms. It should not become a large marketing landing page or disrupt the existing poster-first browsing experience.

Target pages:

- home: broad free movie and TV browsing
- movies: free movies, genres, trending titles
- tv shows: TV shows online, seasons and popular series
- anime: anime movies and anime TV shows
- new and popular: trending and newly popular titles
- mobile app: Android app, mobile viewing, direct access

## Components and Helpers

Create small SEO helpers instead of scattering strings across pages:

- static page metadata factory
- canonical URL helper
- media image URL helper
- JSON-LD script component
- Movie/TV schema builder
- WebSite schema builder

The helpers should live near existing metadata utilities, likely in `src/lib/seo.ts` or as additions to `src/lib/utils.ts` if the codebase favors keeping utilities together.

## Data Flow

Static pages use local SEO config to generate metadata.

Detail pages fetch TMDB details and keywords through existing `MovieService` calls, then pass the result into metadata and schema builders.

Sitemap routes use existing TMDB trending data and URL builders to emit static and dynamic URLs.

## Error Handling

Metadata and schema generation must tolerate missing TMDB fields:

- missing overview falls back to a readable description
- missing image falls back to the site Open Graph image
- missing date, rating, or runtime is omitted from schema
- failed TMDB fetch still returns safe fallback metadata

Sitemap generation should return valid XML even if a dynamic page has no results.

## Testing and Verification

Run:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Manual checks:

- inspect rendered metadata for home, movies, TV, anime, mobile app, and a detail page
- inspect `/sitemap.xml` and one `/sitemap/<id>.xml`
- inspect `robots.txt`
- verify JSON-LD script output is valid JSON

## Non-Goals

- Guaranteeing first-page or first-rank Google placement
- Creating doorway pages
- Keyword stuffing hidden text
- Cloaking crawler-only content
- Copying copyrighted movie descriptions beyond data already fetched through the existing TMDB integration
- Changing watch/embed behavior
