import type { TechnologyDefinition } from '../../types';

export const pagenudgeTechnologyDefinition = {
	id: "pagenudge",
	name: "PageNudge",
	website: "https://pagenudge.com",
	description: "PageNudge is a website personalization tool that displays contextual messages and prompts to visitors based on behavior or page content, helping tailor interactions and guide user actions across a site.",
	icon: "PageNudge.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "pagenudge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.pagenudge\\.com\\/"),
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
