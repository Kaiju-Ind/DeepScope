import type { TechnologyDefinition } from '../../types';

export const tieitTechnologyDefinition = {
	id: "tieit",
	name: "TIEIT",
	website: "https://www.tieit.ai",
	description: "TIEIT is an all-in-one platform offering integrated tools for sales, marketing, customer service, billing, subscriptions, and scheduling, designed to streamline business operations in a unified solution.",
	icon: "TIEIT.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "tieit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.tieit\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
