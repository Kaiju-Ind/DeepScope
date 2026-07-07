import type { TechnologyDefinition } from '../../types';

export const tagboardTechnologyDefinition = {
	id: "tagboard",
	name: "Tagboard",
	website: "https://tagboard.com",
	description: "Tagboard is a platform which allows users to aggregate data from major social networking websites and embed, repost and redisplay it on various media.",
	icon: "Tagboard.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tagboard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tagboard\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tagboard:dom:1",
			kind: "dom",
			selector: "iframe[src*='.tagboard.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
