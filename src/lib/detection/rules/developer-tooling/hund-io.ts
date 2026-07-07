import type { TechnologyDefinition } from '../../types';

export const hundIoTechnologyDefinition = {
	id: "hund-io",
	name: "Hund.io",
	website: "https://hund.io",
	description: "Hund.io is an automated status pages with monitoring.",
	icon: "Hund.io.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "hund-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hund\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hund-io:dom:1",
			kind: "dom",
			selector: "link[href*='hund-client-logos']",
			description: "DOM selector matches a known technology marker.",
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
