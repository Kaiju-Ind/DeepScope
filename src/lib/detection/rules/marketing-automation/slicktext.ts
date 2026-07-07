import type { TechnologyDefinition } from '../../types';

export const slicktextTechnologyDefinition = {
	id: "slicktext",
	name: "SlickText",
	website: "https://www.slicktext.com",
	description: "SlickText is a cloud-based SMS marketing solution for business of all sizes.",
	icon: "SlickText.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "slicktext:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.slicktext\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
