import type { TechnologyDefinition } from '../../types';

export const scoopItTechnologyDefinition = {
	id: "scoop-it",
	name: "Scoop.it",
	website: "https://www.scoop.it",
	description: "Scoop.it is a content marketing software company based in San Francisco which provide content curation platform.",
	icon: "Scoop.it.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "scoop-it:dom:0",
			kind: "dom",
			selector: "iframe[src*='.scoop.it/'], a[href*='.scoop.it/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
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
