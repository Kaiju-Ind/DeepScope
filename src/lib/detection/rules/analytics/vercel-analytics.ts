import type { TechnologyDefinition } from '../../types';

export const vercelAnalyticsTechnologyDefinition = {
	id: "vercel-analytics",
	name: "Vercel Analytics",
	website: "https://vercel.com/analytics",
	icon: "vercel.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "vercel-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/va\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vercel-analytics:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_vercel\\/insights\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"vercel",
	],
} as const satisfies TechnologyDefinition;
