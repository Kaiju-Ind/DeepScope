import type { TechnologyDefinition } from '../../types';

export const siteSearch360TechnologyDefinition = {
	id: "site-search-360",
	name: "Site Search 360",
	website: "https://www.sitesearch360.com/",
	description: "Site Search 360 is a site search as a service solution.",
	icon: "Site Search 360.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "site-search-360:jsGlobal:0",
			kind: "jsGlobal",
			property: "ss360Config",
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
