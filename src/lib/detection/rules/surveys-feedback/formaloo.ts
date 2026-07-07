import type { TechnologyDefinition } from '../../types';

export const formalooTechnologyDefinition = {
	id: "formaloo",
	name: "Formaloo",
	website: "https://www.formaloo.com",
	description: "Formaloo is a no-code collaboration platform that helps businesses create custom data-driven business applications and internal tools, automate their processes and engage their audience.",
	icon: "Formaloo.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formaloo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/formaloo\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formaloo:dom:1",
			kind: "dom",
			selector: "iframe[src*='//formaloo.net/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
