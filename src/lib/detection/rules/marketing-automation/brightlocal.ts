import type { TechnologyDefinition } from '../../types';

export const brightlocalTechnologyDefinition = {
	id: "brightlocal",
	name: "BrightLocal",
	website: "https://www.brightlocal.com",
	description: "BrightLocal is an all-in-one local SEO dashboard for websites.",
	icon: "BrightLocal.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brightlocal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brightlocal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
