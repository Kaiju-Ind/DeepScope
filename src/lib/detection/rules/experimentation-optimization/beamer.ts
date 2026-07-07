import type { TechnologyDefinition } from '../../types';

export const beamerTechnologyDefinition = {
	id: "beamer",
	name: "Beamer",
	website: "https://www.getbeamer.com",
	description: "Beamer is a feature management platform that allows businesses to manage and share new product releases, feature updates, and bug fixes with their customers.",
	icon: "Beamer.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "beamer:jsGlobal:0",
			kind: "jsGlobal",
			property: "Beamer.enabled",
			valuePattern: new RegExp("true"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beamer:jsGlobal:1",
			kind: "jsGlobal",
			property: "_BEAMER_URL",
			valuePattern: new RegExp("\\/\\/app\\.getbeamer\\.com\\/"),
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
