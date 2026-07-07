import type { TechnologyDefinition } from '../../types';

export const talentClueTechnologyDefinition = {
	id: "talent-clue",
	name: "Talent Clue",
	website: "https://talentclue.com",
	description: "Talent Clue is an inbound recruitment tool designed to help organizations connect with top talent.",
	icon: "TalentClue.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "talent-clue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("careers\\.talentclue\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "talent-clue:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.talentclue\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
