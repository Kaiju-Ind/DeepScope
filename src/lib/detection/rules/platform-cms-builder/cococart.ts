import type { TechnologyDefinition } from '../../types';

export const cococartTechnologyDefinition = {
	id: "cococart",
	name: "Cococart",
	website: "https://www.cococart.co",
	description: "Cococart is an ecommerce platform that enables businesses to create and manage online shops.",
	icon: "Cococart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cococart:dom:0",
			kind: "dom",
			selector: "meta[property='og:image'][content*='static.cococart.co']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cococart:dom:1",
			kind: "dom",
			selector: "div[style*='static.cococart.co']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cococart:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("\\.cococart\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
