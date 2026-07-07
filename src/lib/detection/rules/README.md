# Detection rules layout

Rules are organized by normalized category first, then by technology file:

```txt
src/lib/detection/rules/
  analytics/
    google-analytics.ts
    vercel-analytics.ts
    index.ts
  infrastructure-hosting/
    vercel.ts
    wordpress.ts
    index.ts
```

Use one file per technology detection by default. Group definitions in one file only when they are tightly coupled variants of the same product family and live in the same category, such as `wordpress`, `wordpress-block-editor`, and `wordpress-site-editor`.

Keep distinct products in separate category folders even when they share a brand. For example, `infrastructure-hosting/vercel.ts`, `analytics/vercel-analytics.ts`, and `monitoring-error-tracking/vercel-speed-insights.ts` should stay separate because they detect different products in different categories.

Each category folder owns an `index.ts` file that exports the category aggregate consumed by `rules/index.ts`. This keeps category imports stable while making individual detections easier to find and review.

## Category semantics

Categories are the public classification layer.

A detection can be broad as long as the evidence is precise. Fonts, layout patterns, document standards, performance hints, accessibility patterns, mobile/app metadata, and design-system signals are valid technology facts when they help explain how a product was made.

Examples:

- `content-publishing`: RSS, Atom, canonical links, hreflang, JSON-LD, Schema.org, RSD.
- `search`: OpenSearch descriptions and site-search integrations.
- `widgets-misc`: Open Graph, Twitter Cards, embeddable widgets, miscellaneous page features.
- `mobile`: viewport metadata, app banners, web app manifests, responsive image patterns.
- `styling-library`: font services and downloadable font technologies.
- `styling-processor`: CSS language features and layout/style construction patterns.
- `accessibility`: ARIA, skip links, reduced-motion support, accessibility widgets.
- `infrastructure-hosting`: resource hints, CDN/hosting providers, cache/server delivery signals.

## Promotion quality bar

Active rules should be specific enough that the matched fact is defensible. Good evidence includes:

- a vendor-owned host or CDN path, for example `cdn.parsely.com/keys/<site>/p.js`;
- a product-owned global or data attribute documented by that product;
- a CMS/plugin/theme asset path with a stable slug, for example `/wp-content/plugins/elementor/`;
- a response header or request URL that directly names the product;
- a package/runtime version marker that can be extracted from a library-owned URL, global, or bundled source;
- a precise web-standard marker, for example `rel="alternate"` with `application/rss+xml`, `rel="search"` with `application/opensearchdescription+xml`, or `meta[name="viewport"]`.

Avoid rules based only on generic tags, broad class substrings, arbitrary words, arbitrary colors, or selectors that would match nearly every modern page.

Good generic detection:

```ts
{
  id: "rss:link:alternate-rss",
  kind: "link",
  rel: "alternate",
  typePattern: /^application\/rss\+xml$/i,
}
```

Bad generic detection:

```ts
{
  id: "rss:dom:any-application-link",
  kind: "dom",
  selector: "link[type*='application']",
}
```
