import type { TechnologyDefinition } from '../../types';

export const tablefeverTechnologyDefinition = {
	id: "tablefever",
	name: "TableFever",
	website: "https://www.tablefever.com",
	description: "TableFever is a platform that helps locate top restaurants, make reservations, and explore nearby dining options for a curated culinary experience.",
	icon: "TableFever.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tablefever:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tablefever\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tablefever:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.tablefever\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
