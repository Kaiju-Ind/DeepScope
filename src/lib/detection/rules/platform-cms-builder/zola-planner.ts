import type { TechnologyDefinition } from '../../types';

export const zolaPlannerTechnologyDefinition = {
	id: "zola-planner",
	name: "Zola Planner",
	website: "https://www.zola.com/wedding-registry",
	description: "Zola Planner is a wedding registry system that allows couples to manage gift selections, track contributions, and coordinate registry details in one centralized platform.",
	icon: "ZolaPlanner.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zola-planner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.zola\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zola-planner:jsGlobal:1",
			kind: "jsGlobal",
			property: "ZolaWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zola-planner:jsGlobal:2",
			kind: "jsGlobal",
			property: "zola.env",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
