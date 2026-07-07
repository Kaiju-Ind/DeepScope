import type { TechnologyDefinition } from '../../types';

export const widdeTechnologyDefinition = {
	id: "widde",
	name: "Widde",
	website: "https://widde.io",
	description: "Widde is a platform that enables the use of interactive ecommerce videos on webpages, enhancing the shopping experience and providing businesses with a competitive advantage.",
	icon: "Widde.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "widde:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.widde\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "widde:header:1",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("\\.widde\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "widde:header:2",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.widde\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
