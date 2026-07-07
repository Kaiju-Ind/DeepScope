import type { TechnologyDefinition } from '../../types';

export const alboomPrositeTechnologyDefinition = {
	id: "alboom-prosite",
	name: "Alboom Prosite",
	website: "https://www.alboompro.com/ferramentas/alboom-prosite",
	description: "Alboom Prosite is a website and landing page builder for businesses.",
	icon: "Alboom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "alboom-prosite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bifrost\\.alboompro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
