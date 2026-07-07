import type { TechnologyDefinition } from '../../types';

export const geggioTechnologyDefinition = {
	id: "geggio",
	name: "Geggio",
	website: "https://www.geggio.com",
	description: "Geggio is an all-in-one funnel tool for SMEs that integrates landing pages, emails, automations, and CRM.",
	icon: "Geggio.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "geggio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.geggio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "geggio:jsGlobal:1",
			kind: "jsGlobal",
			property: "geggio.addElement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
