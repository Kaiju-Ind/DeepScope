import type { TechnologyDefinition } from '../../types';

export const pushouseTechnologyDefinition = {
	id: "pushouse",
	name: "Pushouse",
	website: "https://www.pushouse.com",
	description: "Pushouse is a platform that provides solutions to enhance sales in ecommerce through data-driven strategies and automation.",
	icon: "Pushouse.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushouse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dev\\.pushouse\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
