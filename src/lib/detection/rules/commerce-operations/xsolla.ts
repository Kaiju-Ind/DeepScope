import type { TechnologyDefinition } from '../../types';

export const xsollaTechnologyDefinition = {
	id: "xsolla",
	name: "Xsolla",
	website: "https://xsolla.com",
	description: "Xsolla is a video game business system offering payment solutions and store management.",
	icon: "Xsolla.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "xsolla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.xsolla\\.(com|net)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
