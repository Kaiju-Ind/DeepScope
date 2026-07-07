import type { TechnologyDefinition } from '../../types';

export const alfrightTechnologyDefinition = {
	id: "alfright",
	name: "Alfright",
	website: "https://www.alfright.eu",
	description: "Alfright is a service that ensures GDPR compliance for websites, enhancing privacy standards.",
	icon: "Alfright.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "alfright:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.alfright\\.eu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alfright:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.alfright.eu/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
