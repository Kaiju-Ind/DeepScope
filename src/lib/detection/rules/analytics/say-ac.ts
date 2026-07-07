import type { TechnologyDefinition } from '../../types';

export const sayAcTechnologyDefinition = {
	id: "say-ac",
	name: "Say.ac",
	website: "https://say.ac",
	description: "Say.ac is a platform for webmasters that analyzes website visitor data and provides insights on traffic patterns and user behavior.",
	icon: "SayAC.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "say-ac:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/say\\.ac\\/(v[0-9]+)?\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
