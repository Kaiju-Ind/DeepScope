import type { TechnologyDefinition } from '../../types';

export const feverTechnologyDefinition = {
	id: "fever",
	name: "Fever",
	website: "https://feverup.com",
	description: "Fever is a digital platform facilitating the discovery and booking of top events and experiences worldwide.",
	icon: "Fever.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fever:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("feverup\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
