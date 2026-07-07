import type { TechnologyDefinition } from '../../types';

export const frontstreamTechnologyDefinition = {
	id: "frontstream",
	name: "Frontstream",
	website: "https://www.frontstream.com",
	description: "FrontStream is a fundraising platform, formerly FirstGiving, that supports walks, runs, rides, DIY, and virtual activity challenge campaigns.",
	icon: "FrontStream.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "frontstream:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.firstgiving\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
