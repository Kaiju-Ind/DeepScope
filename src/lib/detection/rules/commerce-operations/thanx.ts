import type { TechnologyDefinition } from '../../types';

export const thanxTechnologyDefinition = {
	id: "thanx",
	name: "Thanx",
	website: "https://www.thanx.com",
	description: "Thanx is a platform that captures insights, retains loyal fans, sends highly-targeted campaigns, and measures results in real revenue.",
	icon: "Thanx.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "thanx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.thanx\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
