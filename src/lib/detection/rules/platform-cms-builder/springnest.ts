import type { TechnologyDefinition } from '../../types';

export const springnestTechnologyDefinition = {
	id: "springnest",
	name: "Springnest",
	website: "https://springnest.com",
	description: "Springnest is a website builder designed for tourism professionals, offering tools to create and manage travel-related websites.",
	icon: "Springnest.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "springnest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("b-cdn\\.springnest\\.com"),
			description: "Script source URL matches a known technology marker.",
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
