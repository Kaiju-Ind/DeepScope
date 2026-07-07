import type { TechnologyDefinition } from '../../types';

/**
 * Detects Next.js prerender/cache behavior from framework-owned response
 * headers. These headers are stronger than URL shape because they describe how
 * Next served the current payload, including stale-time and precomputed route
 * matching.
 */
export const nextJsPrerenderCacheTechnologyDefinition = {
	id: "next-js-prerender-cache",
	name: "Next.js Prerender Cache",
	website: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
	description: "Next.js prerendering and cache headers expose statically rendered or precomputed route responses served by the framework runtime.",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "next-js-prerender-cache:header:prerender",
			kind: "header",
			key: "x-nextjs-prerender",
			valuePattern: /^(?:1|true)$/i,
			confidence: 95,
			description: "Main document response reports a Next.js prerendered payload.",
		},
		{
			id: "next-js-prerender-cache:responseHeader:prerender",
			kind: "responseHeader",
			key: "x-nextjs-prerender",
			valuePattern: /^(?:1|true)$/i,
			confidence: 95,
			description: "Captured response reports a Next.js prerendered payload.",
		},
		{
			id: "next-js-prerender-cache:responseHeader:stale-time",
			kind: "responseHeader",
			key: "x-nextjs-stale-time",
			valuePattern: /^\d+$/,
			confidence: 90,
			description: "Captured response exposes the Next.js stale-time cache header.",
		},
		{
			id: "next-js-prerender-cache:responseHeader:matched-precomputed-path",
			kind: "responseHeader",
			key: "x-matched-path",
			valuePattern: /\/precomputed\//i,
			confidence: 85,
			description: "Captured response maps the request to a precomputed Next.js route.",
		},
	],
	implies: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
