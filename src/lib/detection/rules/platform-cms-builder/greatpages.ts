import type { TechnologyDefinition } from '../../types';

export const greatpagesTechnologyDefinition = {
	id: "greatpages",
	name: "GreatPages",
	website: "https://www.greatpages.com.br",
	description: "GreatPages is a multi-purpose page builder software developed in Brazil.",
	icon: "GreatPages.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "greatpages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.greatpages\\.com\\.br\\/"),
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
