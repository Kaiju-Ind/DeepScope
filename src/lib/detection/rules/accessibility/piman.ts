import type { TechnologyDefinition } from '../../types';

export const pimanTechnologyDefinition = {
	id: "piman",
	name: "Piman",
	website: "https://ya-sai.github.io/piman/",
	description: "Piman is an open-source accessibility UI framework create by Blueplanet Inc.",
	icon: "Piman.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "piman:dom:0",
			kind: "dom",
			selector: "button.bpa-btn",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
