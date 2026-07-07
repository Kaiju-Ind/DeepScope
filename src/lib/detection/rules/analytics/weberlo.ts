import type { TechnologyDefinition } from '../../types';

export const weberloTechnologyDefinition = {
	id: "weberlo",
	name: "Weberlo",
	website: "https://www.weberlo.com",
	description: "Weberlo is a platform that enables users to track their Return on Investment (ROI) and Return on Advertising Spend (ROAS).",
	icon: "Weberlo.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "weberlo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.weberlo\\.com\\/"),
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
