import type { TechnologyDefinition } from '../../types';

export const kimonixTechnologyDefinition = {
	id: "kimonix",
	name: "Kimonix",
	website: "https://www.kimonix.com",
	description: "Kimonix is a profit-driven merchandising platform designed to optimize product listings and increase sales performance.",
	icon: "Kimonix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kimonix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.kimonix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kimonix:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.kimonix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "kimonix:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?:api\\.)?kimonix\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kimonix:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("(?:api\\.)?kimonix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
