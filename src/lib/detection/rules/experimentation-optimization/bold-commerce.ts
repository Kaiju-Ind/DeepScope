import type { TechnologyDefinition } from '../../types';

export const boldCommerceTechnologyDefinition = {
	id: "bold-commerce",
	name: "Bold Commerce",
	website: "https://boldcommerce.com",
	description: "Bold Commerce is a software company that specialises in ecommerce websites and app development.",
	icon: "Bold.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bold-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boldapps\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bold-commerce:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boldcommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
