import type { TechnologyDefinition } from '../../types';

export const tapadTechnologyDefinition = {
	id: "tapad",
	name: "Tapad",
	website: "https://www.tapad.com",
	description: "Tapad is a venture-funded startup company that develops and markets software and services for cross-device advertising and content delivery.",
	icon: "Tapad.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tapad:dom:0",
			kind: "dom",
			selector: "link[href*='pixel.tapad.com'], img[src*='pixel.tapad.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
