import type { TechnologyDefinition } from '../../types';

export const widerplanetTechnologyDefinition = {
	id: "widerplanet",
	name: "WiderPlanet",
	website: "https://widerplanet.com",
	description: "WiderPlanet is a real-time advertising platform that utilises user behaviour data to deliver targeted advertisements.",
	icon: "WiderPlanet.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "widerplanet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.widerplanet\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
