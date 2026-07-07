import type { TechnologyDefinition } from '../../types';

export const sleekplanTechnologyDefinition = {
	id: "sleekplan",
	name: "Sleekplan",
	website: "https://sleekplan.com",
	description: "Sleekplan is a customer feedback and product management platform that enables businesses to collect, analyse, and act upon user feedback, prioritise feature requests, track bugs, and collaborate on product development.",
	icon: "Sleekplan.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "sleekplan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sleekplan\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
