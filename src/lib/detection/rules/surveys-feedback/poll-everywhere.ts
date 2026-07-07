import type { TechnologyDefinition } from '../../types';

export const pollEverywhereTechnologyDefinition = {
	id: "poll-everywhere",
	name: "Poll Everywhere",
	website: "https://www.polleverywhere.com",
	description: "Poll Everywhere is a tool that transforms presentations, meetings, and classes into immersive, interactive experiences, enabling audience engagement through real-time participation.",
	icon: "PollEverywhere.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "poll-everywhere:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.polleverywhere\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
