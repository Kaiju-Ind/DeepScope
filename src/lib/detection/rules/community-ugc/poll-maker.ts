import type { TechnologyDefinition } from '../../types';

export const pollMakerTechnologyDefinition = {
	id: "poll-maker",
	name: "Poll Maker",
	website: "https://www.poll-maker.com",
	description: "Poll Maker is a system designed to create and manage online polls, allowing users to gather opinions, feedback, or votes.",
	icon: "PollMaker.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "poll-maker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.poll-maker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
