import type { TechnologyDefinition } from '../../types';

export const glitchTechnologyDefinition = {
	id: "glitch",
	name: "Glitch",
	website: "https://glitch.com",
	description: "Glitch is a collaborative programming environment that lives in your browser and deploys code as you type.",
	icon: "Glitch.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "glitch:url:0",
			kind: "url",
			pattern: new RegExp("https:\\/\\/[^.]+\\.glitch\\.me"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
