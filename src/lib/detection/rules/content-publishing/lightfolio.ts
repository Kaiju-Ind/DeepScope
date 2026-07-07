import type { TechnologyDefinition } from '../../types';

export const lightfolioTechnologyDefinition = {
	id: "lightfolio",
	name: "Lightfolio",
	website: "https://www.lightfolio.com",
	description: "Lightfolio is a platform that offers online photo galleries designed for easy sharing, downloading, and selling of images.",
	icon: "Lightfolio.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "lightfolio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lfpublicstatic\\.lightfolio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
