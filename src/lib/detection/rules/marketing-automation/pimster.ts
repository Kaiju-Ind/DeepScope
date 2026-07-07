import type { TechnologyDefinition } from '../../types';

export const pimsterTechnologyDefinition = {
	id: "pimster",
	name: "Pimster",
	website: "https://pimster.app",
	description: "Pimster is a platform that enables the creation and distribution of interactive, shoppable web stories across websites, email campaigns, and QR codes.",
	icon: "Pimster.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pimster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pimster\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
