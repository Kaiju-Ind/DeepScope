import type { TechnologyDefinition } from '../../types';

export const vreviewTechnologyDefinition = {
	id: "vreview",
	name: "VReview",
	website: "https://vreview.tv",
	description: "VReview is an AI review marketing solution that boosts a shopping mall's purchase conversion rate by utilising customer reviews.",
	icon: "VReview.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "vreview:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.vreview\\.tv\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vreview:jsGlobal:1",
			kind: "jsGlobal",
			property: "vreviewWidget",
			description: "Page-owned global matches a known technology marker.",
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
