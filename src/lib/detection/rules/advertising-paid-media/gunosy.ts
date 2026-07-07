import type { TechnologyDefinition } from '../../types';

export const gunosyTechnologyDefinition = {
	id: "gunosy",
	name: "Gunosy",
	website: "https://gunosy.com",
	description: "Gunosy is a Japan-based readable news summary advertising system that delivers sponsored content in a format designed to resemble concise news articles within digital media platforms.",
	icon: "Gunosy.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "gunosy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("ad\\.gunosy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
