import type { TechnologyDefinition } from '../../types';

export const networkForGoodTechnologyDefinition = {
	id: "network-for-good",
	name: "Network for Good",
	website: "https://www.networkforgood.com",
	description: "Network for Good is an American certified B Corporation software company that offers fundraising software and coaching for charities and non-profit organisations.",
	icon: "Network for Good.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "network-for-good:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.networkforgood\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "network-for-good:dom:1",
			kind: "dom",
			selector: "a[href*='.networkforgood.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
