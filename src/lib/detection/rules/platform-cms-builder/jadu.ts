import type { TechnologyDefinition } from '../../types';

export const jaduTechnologyDefinition = {
	id: "jadu",
	name: "Jadu",
	website: "https://www.jadu.net/",
	description: "Jadu is a commercial Digital Experience Platform focused on customer self-service with accessibility at the core. Websites, Forms, CRM and Case Management written in PHP with integrations to many enterprise systems.",
	icon: "jadu.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jadu:dom:0",
			kind: "dom",
			selector: "a[href*='www.jadu.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jadu:header:1",
			kind: "header",
			key: "Node",
			valuePattern: new RegExp("jadu-web-1", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jadu:dom:2",
			kind: "dom",
			selector: "footer.site-footer",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "jadu:text:3",
			kind: "text",
			pattern: new RegExp("Designed and powered by Jadu"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "jadu:header:4",
			kind: "header",
			key: "node",
			valuePattern: new RegExp("^jadu-web-.", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
