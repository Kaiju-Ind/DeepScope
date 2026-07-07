import type { TechnologyDefinition } from '../../types';

export const klickpagesTechnologyDefinition = {
	id: "klickpages",
	name: "KlickPages",
	website: "https://klickpages.com.br",
	description: "KlickPages is a landing page management software designed to help businesses execute email marketing campaigns and capture leads.",
	icon: "KlickPages.svg",
	categories: [
		"marketing-automation",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "klickpages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.klickpages\\.com\\.br\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klickpages:jsGlobal:1",
			kind: "jsGlobal",
			property: "klickart.analytics",
			description: "Page-owned global matches a known technology marker.",
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
