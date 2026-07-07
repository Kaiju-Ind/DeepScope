import type { TechnologyDefinition } from '../../types';

export const ultimateBulletinBoardTechnologyDefinition = {
	id: "ultimate-bulletin-board",
	name: "Ultimate Bulletin Board",
	website: "https://www.ubbcentral.com",
	description: "Ultimate Bulletin Board is an internet forum software designed for online communities, offering features such as user registration, thread organisation, moderation tools, search functionality, and customisable design options to facilitate discussions and community engagement.",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "ultimate-bulletin-board:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^UBB\\.threads\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ultimate-bulletin-board:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ubb\\.threads\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
