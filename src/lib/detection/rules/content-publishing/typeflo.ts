import type { TechnologyDefinition } from '../../types';

export const typefloTechnologyDefinition = {
	id: "typeflo",
	name: "Typeflo",
	website: "https://typeflo.io",
	description: "Typeflo is a platform that simplifies blogging by allowing users to create websites directly from Google Docs, offering features such as analytics, custom domains, and theme customization.",
	icon: "Typeflo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "typeflo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.typeflo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
