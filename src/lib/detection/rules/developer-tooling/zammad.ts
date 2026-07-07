import type { TechnologyDefinition } from '../../types';

export const zammadTechnologyDefinition = {
	id: "zammad",
	name: "Zammad",
	website: "https://zammad.org",
	description: "Zammad is a web-based, open-source support and ticketing system designed for managing user inquiries and organizing customer service workflows.",
	icon: "Zammad.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "zammad:dom:0",
			kind: "dom",
			selector: "script[id*='zammad_form_script']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
