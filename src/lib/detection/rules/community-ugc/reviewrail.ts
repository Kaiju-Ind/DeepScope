import type { TechnologyDefinition } from '../../types';

export const reviewrailTechnologyDefinition = {
	id: "reviewrail",
	name: "ReviewRail",
	website: "https://reviewrail.com/",
	description: "ReviewRail is an online review system designed to collect, manage, and display customer feedback.",
	icon: "ReviewRail.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewrail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.reviewrail\\.com\\/"),
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
