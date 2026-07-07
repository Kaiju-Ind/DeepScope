import type { TechnologyDefinition } from '../../types';

export const reviewdokuTechnologyDefinition = {
	id: "reviewdoku",
	name: "Reviewdoku",
	website: "https://reviewdoku.com",
	description: "Reviewdoku is a review management platform that integrates with eCommerce stores to analyze customer feedback and optimize conversion rates.",
	icon: "Reviewdoku.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewdoku:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.reviewdoku\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
