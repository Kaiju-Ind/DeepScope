import type { TechnologyDefinition } from '../../types';

export const clickupTechnologyDefinition = {
	id: "clickup",
	name: "ClickUp",
	website: "https://clickup.com",
	description: "ClickUp is a project management software suitable for businesses of all sizes and industries.",
	icon: "ClickUp.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "clickup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/app-cdn\\.clickup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clickup:jsGlobal:1",
			kind: "jsGlobal",
			property: "clickupCanBootstrapPromise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
