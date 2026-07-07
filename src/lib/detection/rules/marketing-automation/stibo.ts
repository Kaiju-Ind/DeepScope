import type { TechnologyDefinition } from '../../types';

export const stiboTechnologyDefinition = {
	id: "stibo",
	name: "Stibo",
	website: "https://www.stibo.com",
	description: "Stibo is a cloud-based software solution designed to help businesses manage organizational data.",
	icon: "Stibo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "stibo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("product-analytics\\.stibo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
