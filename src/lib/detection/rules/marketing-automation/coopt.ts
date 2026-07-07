import type { TechnologyDefinition } from '../../types';

export const cooptTechnologyDefinition = {
	id: "coopt",
	name: "Coopt",
	website: "https://www.getcoopt.com",
	description: "Coopt is a tool designed to boost sales by transforming customers into social media advertisers, leveraging their networks to promote products and services, thus enhancing brand visibility and engagement.",
	icon: "Coopt.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "coopt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getcoopt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coopt:jsGlobal:1",
			kind: "jsGlobal",
			property: "cooptjQuery.Animation",
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
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
