import type { TechnologyDefinition } from '../../types';

export const siftTechnologyDefinition = {
	id: "sift",
	name: "Sift",
	website: "https://sift.com/",
	description: "Sift is a CA-based fraud prevention company.",
	icon: "Sift.svg",
	categories: [
		"analytics",
		"security",
	],
	rules: [
		{
			id: "sift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sift(?:science)?\\.com\\/s\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sift:jsGlobal:1",
			kind: "jsGlobal",
			property: "__siftFlashCB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sift:jsGlobal:2",
			kind: "jsGlobal",
			property: "_sift",
			description: "Page-owned global matches a known technology marker.",
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
