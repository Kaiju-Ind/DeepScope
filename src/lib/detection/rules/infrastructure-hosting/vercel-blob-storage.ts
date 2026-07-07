import type { TechnologyDefinition } from '../../types';

/**
 * Detects Vercel Blob Storage from its public asset host. The host suffix is
 * intentionally specific so normal Vercel deployment URLs do not imply Blob
 * Storage unless the page actually loads blob-backed assets.
 */
export const vercelBlobStorageTechnologyDefinition = {
	id: "vercel-blob-storage",
	name: "Vercel Blob Storage",
	website: "https://vercel.com/docs/vercel-blob",
	description: "Vercel Blob Storage stores and serves user files or generated assets through public blob-backed Vercel storage hosts.",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "vercel-blob-storage:resourceUrl:public-blob-host",
			kind: "resourceUrl",
			pattern: /https?:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//i,
			confidence: 95,
			description: "Loaded resource URL uses a public Vercel Blob Storage host.",
		},
		{
			id: "vercel-blob-storage:requestUrl:public-blob-host",
			kind: "requestUrl",
			pattern: /https?:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//i,
			confidence: 95,
			description: "Captured request URL uses a public Vercel Blob Storage host.",
		},
		{
			id: "vercel-blob-storage:html:public-blob-host",
			kind: "html",
			pattern: /https?:\/\/[^"'\s<>]+\.public\.blob\.vercel-storage\.com\//i,
			confidence: 85,
			description: "Document markup references a public Vercel Blob Storage asset host.",
		},
	],
	implies: [
		"vercel",
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
