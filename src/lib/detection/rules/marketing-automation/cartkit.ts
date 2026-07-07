import type { TechnologyDefinition } from '../../types';

export const cartkitTechnologyDefinition = {
	id: "cartkit",
	name: "CartKit",
	website: "https://www.cartkit.com",
	description: "CartKit build apps from fuss-free multi-channel marketing automation and campaigns to social proof popups and user session recording.",
	icon: "CartKit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cartkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cartkitcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
