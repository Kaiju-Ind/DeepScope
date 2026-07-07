import type { TechnologyDefinition } from '../../types';

export const leadinTechnologyDefinition = {
	id: "leadin",
	name: "LEADIN",
	website: "https://leadin.com",
	description: "LEADIN is a tool that provides insights into individuals who fill out forms on a site, utilizing Hubspot's market-leading CRM for implementation.",
	icon: "LEADIN.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "leadin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.leadin\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
