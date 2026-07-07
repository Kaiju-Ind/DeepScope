import type { TechnologyDefinition } from '../../types';

export const juoTechnologyDefinition = {
	id: "juo",
	name: "Juo",
	website: "https://get.juo.io",
	description: "Juo is a centralised experimentation platform for innovative marketing and product teams.",
	icon: "Juo.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "juo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.juo\\.io\\/"),
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
