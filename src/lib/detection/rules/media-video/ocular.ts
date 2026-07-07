import type { TechnologyDefinition } from '../../types';

export const ocularTechnologyDefinition = {
	id: "ocular",
	name: "Ocular",
	website: "https://ocularsolution.com/",
	description: "Ocular is a video ecommerce and live commerce platform facilitating transactions and shopping experiences through live broadcasts and interactive features.",
	icon: "Ocular.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "ocular:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.ocularsolution\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
