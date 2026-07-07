import type { TechnologyDefinition } from '../../types';

export const funraiseTechnologyDefinition = {
	id: "funraise",
	name: "Funraise",
	website: "https://funraise.org",
	description: "Funraise is a nonprofit fundraising platform that enables organisations to build fundraising websites as well as manage donations and campaigns.",
	icon: "Funraise.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "funraise:dom:0",
			kind: "dom",
			selector: "a[href*='.funraise.org/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "funraise:jsGlobal:1",
			kind: "jsGlobal",
			property: "FR.IMAGE_BASE_URL",
			valuePattern: new RegExp("\\.funraise\\.io"),
			description: "Page-owned global matches a known technology marker.",
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
