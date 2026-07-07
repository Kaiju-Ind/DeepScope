import type { TechnologyDefinition } from '../../types';

export const maysonTechnologyDefinition = {
	id: "mayson",
	name: "Mayson",
	website: "https://mayson.dev",
	description: "Mayson is an AI-powered website and app builder platform.",
	icon: "Mayson.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mayson:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mayson\\.app\\/assets\\/index-[A-Za-z0-9]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mayson:dom:1",
			kind: "dom",
			selector: "link[href*='app.mayson.dev/icons/brand-logo-192x192.png']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mayson:jsGlobal:2",
			kind: "jsGlobal",
			property: "__MAYSON",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
