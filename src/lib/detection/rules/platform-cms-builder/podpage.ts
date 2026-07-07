import type { TechnologyDefinition } from '../../types';

export const podpageTechnologyDefinition = {
	id: "podpage",
	name: "Podpage",
	website: "https://www.podpage.com",
	description: "Podpage is a podcast site builder that automatically creates professional websites for podcasts using RSS feeds.",
	icon: "Podpage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "podpage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.getpodpage\\.com\\/"),
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
