import type { TechnologyDefinition } from '../../types';

export const yieldlabTechnologyDefinition = {
	id: "yieldlab",
	name: "Yieldlab",
	website: "https://yieldlab.de",
	description: "Yieldlab is a German company that provides programmatic advertising technology solutions to optimize ad performance and maximize digital ad spend returns.",
	icon: "Yieldlab.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "yieldlab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/(?:[^/]+\\.)?yieldlab\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
