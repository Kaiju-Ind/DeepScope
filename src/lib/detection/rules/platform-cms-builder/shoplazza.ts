import type { TechnologyDefinition } from '../../types';

export const shoplazzaTechnologyDefinition = {
	id: "shoplazza",
	name: "Shoplazza",
	website: "https://www.shoplazza.com",
	description: "Shoplazza is a SaaS ecommerce platform.",
	icon: "Shoplazza.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoplazza:jsGlobal:0",
			kind: "jsGlobal",
			property: "SHOPLAZZA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoplazza:jsGlobal:1",
			kind: "jsGlobal",
			property: "Shoplazza",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoplazza:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^shoplazza_source$", "i"),
			description: "Cookie name matches a known technology marker.",
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
