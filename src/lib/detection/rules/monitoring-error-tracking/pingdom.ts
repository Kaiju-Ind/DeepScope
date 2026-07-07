import type { TechnologyDefinition } from '../../types';

export const pingdomTechnologyDefinition = {
	id: "pingdom",
	name: "Pingdom",
	website: "https://www.pingdom.com",
	description: "Pingdom is a Swedish website monitoring software as a service company.",
	icon: "Pingdom.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "pingdom:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pingdom\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
