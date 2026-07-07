import type { TechnologyDefinition } from '../../types';

export const fitleTechnologyDefinition = {
	id: "fitle",
	name: "Fitle",
	website: "https://fitle.com",
	description: "Fitle is a clothes size recommendation system developed in France that helps determine accurate apparel sizing based on user data.",
	icon: "Fitle.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fitle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fitle\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
