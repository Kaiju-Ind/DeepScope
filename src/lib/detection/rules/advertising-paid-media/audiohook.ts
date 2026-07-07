import type { TechnologyDefinition } from '../../types';

export const audiohookTechnologyDefinition = {
	id: "audiohook",
	name: "Audiohook",
	website: "https://www.audiohook.com",
	description: "Audiohook specializes in programmatic audio advertising.",
	icon: "Audiohook.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "audiohook:dom:0",
			kind: "dom",
			selector: "img[src*='listen.audiohook.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
