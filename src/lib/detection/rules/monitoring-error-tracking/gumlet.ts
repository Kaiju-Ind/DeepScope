import type { TechnologyDefinition } from '../../types';

export const gumletTechnologyDefinition = {
	id: "gumlet",
	name: "Gumlet",
	website: "https://www.gumlet.com/",
	description: "Gumlet is a solution to optimize images.",
	icon: "Gumlet.png",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "gumlet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gumlet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gumlet:jsGlobal:1",
			kind: "jsGlobal",
			property: "gumlet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
