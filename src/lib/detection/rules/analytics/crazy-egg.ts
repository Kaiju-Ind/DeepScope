import type { TechnologyDefinition } from '../../types';

export const crazyEggTechnologyDefinition = {
	id: "crazy-egg",
	name: "Crazy Egg",
	website: "https://crazyegg.com",
	description: "Crazy Egg is a website optimization platform with heatmaps, session recordings, and A/B testing.",
	icon: "Crazy Egg.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "crazy-egg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.crazyegg\\.com\\/pages\\/scripts\\/\\d+\\/\\d+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crazy-egg:jsGlobal:1",
			kind: "jsGlobal",
			property: "CE2",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
