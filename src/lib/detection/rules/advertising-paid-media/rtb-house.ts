import type { TechnologyDefinition } from '../../types';

export const rtbHouseTechnologyDefinition = {
	id: "rtb-house",
	name: "RTB House",
	website: "https://www.rtbhouse.com",
	description: "RTB House is a company that provides learning-powered retargeting solutions for brands and agencies.",
	icon: "RTB House.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rtb-house:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.creativecdn\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
