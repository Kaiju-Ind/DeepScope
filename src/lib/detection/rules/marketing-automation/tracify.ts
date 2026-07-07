import type { TechnologyDefinition } from '../../types';

export const tracifyTechnologyDefinition = {
	id: "tracify",
	name: "Tracify",
	website: "https://www.tracify.ai",
	description: "Tracify is a tracking solution that uses adblock-proof AI technology to help optimize performance and maximize profitability.",
	icon: "Tracify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tracify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripting\\.tracify\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tracify:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tracify",
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
