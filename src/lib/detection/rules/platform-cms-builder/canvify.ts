import type { TechnologyDefinition } from '../../types';

export const canvifyTechnologyDefinition = {
	id: "canvify",
	name: "Canvify",
	website: "https://canvify.app",
	description: "Canvify is a web application that enables the creation of Shopify landing pages from designs produced in Canva.",
	icon: "Canvify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "canvify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.canvify\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "canvify:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.canvify\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
