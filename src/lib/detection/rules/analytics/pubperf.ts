import type { TechnologyDefinition } from '../../types';

export const pubperfTechnologyDefinition = {
	id: "pubperf",
	name: "Pubperf",
	website: "https://www.pubperf.com",
	description: "Pubperf is an analytics suite designed for digital publishers to measure, monitor, and optimize audience engagement, advertising performance, and content effectiveness across multiple platforms.",
	icon: "Pubperf.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "pubperf:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("t\\.pubperf\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
