import type { TechnologyDefinition } from '../../types';

export const logaholicTechnologyDefinition = {
	id: "logaholic",
	name: "Logaholic",
	website: "https://www.logaholic.com",
	description: "Logaholic is a web analytics software that processes website traffic data to generate reports on visits, user behavior, and referrers.",
	icon: "Logaholic.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "logaholic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("logaholic\\.hostpoint\\.ch\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "logaholic:jsGlobal:1",
			kind: "jsGlobal",
			property: "logaholic",
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
