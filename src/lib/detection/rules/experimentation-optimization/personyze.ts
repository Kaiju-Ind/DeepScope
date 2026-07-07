import type { TechnologyDefinition } from '../../types';

export const personyzeTechnologyDefinition = {
	id: "personyze",
	name: "Personyze",
	website: "https://www.personyze.com",
	description: "Personyze is a real-time visitor segmentation and website personalization platform offering omnichannel customer service capabilities, developed in Brazil.",
	icon: "Personyze.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "personyze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("counter\\.personyze\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "personyze:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("counter\\.personyze\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
