import type { TechnologyDefinition } from '../../types';

/**
 * Detects Vercel's microfrontend client configuration endpoint. The well-known
 * URL is a Vercel-specific runtime contract, so matching it is safer than
 * deriving microfrontend architecture from chunk counts or route structure.
 */
export const vercelMicrofrontendsTechnologyDefinition = {
	id: "vercel-microfrontends",
	name: "Vercel Microfrontends",
	website: "https://vercel.com/docs/microfrontends",
	description: "Vercel Microfrontends coordinate separately owned frontend applications through Vercel deployment and routing infrastructure.",
	categories: [
		"infrastructure-hosting",
		"framework",
	],
	rules: [
		{
			id: "vercel-microfrontends:requestUrl:client-config",
			kind: "requestUrl",
			pattern: /\/\.well-known\/vercel\/microfrontends\/client-config(?:[?#]|$)/i,
			confidence: 100,
			description: "Captured request loads Vercel's well-known microfrontends client configuration endpoint.",
		},
	],
	implies: [
		"vercel",
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
