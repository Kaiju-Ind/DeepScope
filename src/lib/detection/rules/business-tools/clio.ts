import type { TechnologyDefinition } from '../../types';

export const clioTechnologyDefinition = {
	id: "clio",
	name: "Clio",
	website: "https://www.clio.com",
	description: "Clio is a legal software platform for managing clients, cases, and billing within law practices.",
	icon: "Clio.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "clio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.clio\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clio:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^clio_grow_support_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
