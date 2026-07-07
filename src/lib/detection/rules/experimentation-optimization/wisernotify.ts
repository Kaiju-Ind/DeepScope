import type { TechnologyDefinition } from '../../types';

export const wisernotifyTechnologyDefinition = {
	id: "wisernotify",
	name: "WiserNotify",
	website: "https://wisernotify.com",
	description: "WiserNotify is a platform offering social proof and FOMO features for ecommerce sites.",
	icon: "WiserNotify.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "wisernotify:dom:0",
			kind: "dom",
			selector: "link[href*='app.wisernotify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wisernotify:jsGlobal:1",
			kind: "jsGlobal",
			property: "wiser",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
