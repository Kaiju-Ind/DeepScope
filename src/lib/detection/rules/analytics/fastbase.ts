import type { TechnologyDefinition } from '../../types';

export const fastbaseTechnologyDefinition = {
	id: "fastbase",
	name: "Fastbase",
	website: "https://www.fastbase.com",
	description: "Fastbase is a web analytics tool that identifies visitors' real company names and the individuals associated with them, aiding in targeted marketing and lead generation.",
	icon: "Fastbase.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "fastbase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fastbase\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
