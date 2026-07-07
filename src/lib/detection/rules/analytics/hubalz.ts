import type { TechnologyDefinition } from '../../types';

export const hubalzTechnologyDefinition = {
	id: "hubalz",
	name: "Hubalz",
	website: "https://www.hubalz.com",
	description: "Hubalz is an all-in-one analytics and marketing tool.",
	icon: "Hubalz.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hubalz:jsGlobal:0",
			kind: "jsGlobal",
			property: "Hubalz.getClickDetails",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hubalz:jsGlobal:1",
			kind: "jsGlobal",
			property: "hubalz_script.noInputTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
