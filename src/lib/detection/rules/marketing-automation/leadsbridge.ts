import type { TechnologyDefinition } from '../../types';

export const leadsbridgeTechnologyDefinition = {
	id: "leadsbridge",
	name: "LeadsBridge",
	website: "https://leadsbridge.com",
	description: "LeadsBridge is an all-in-one solution for lead generation.",
	icon: "LeadsBridge.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadsbridge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("leadsbridge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadsbridge:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\leadsbridge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
