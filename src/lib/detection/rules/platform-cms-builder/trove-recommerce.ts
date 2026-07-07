import type { TechnologyDefinition } from '../../types';

export const troveRecommerceTechnologyDefinition = {
	id: "trove-recommerce",
	name: "Trove Recommerce",
	website: "https://trove.co",
	description: "Trove (formerly Yerdle) builds white-label technology and end-to-end operations for ecommerce platforms.",
	icon: "trove.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "trove-recommerce:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("reware-production\\.yerdlesite\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "trove-recommerce:dom:1",
			kind: "dom",
			selector: "img[src*='res.cloudinary.com/yerdle']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "trove-recommerce:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("recurate-slider\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trove-recommerce:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("recurate-core\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trove-recommerce:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("recurate-pdp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trove-recommerce:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("recurate-page\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trove-recommerce:jsGlobal:6",
			kind: "jsGlobal",
			property: "troveDataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trove-recommerce:jsGlobal:7",
			kind: "jsGlobal",
			property: "troveGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
