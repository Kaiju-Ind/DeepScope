import type { TechnologyDefinition } from '../../types';

export const aushaTechnologyDefinition = {
	id: "ausha",
	name: "Ausha",
	website: "https://www.ausha.co",
	description: "Ausha is an all-in-one platform for hosting, distributing, and monetizing podcasts.",
	icon: "Ausha.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "ausha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.ausha\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
