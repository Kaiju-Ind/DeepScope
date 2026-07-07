import type { TechnologyDefinition } from '../../types';

export const teamlinktTechnologyDefinition = {
	id: "teamlinkt",
	name: "TeamLinkt",
	website: "https://teamlinkt.com",
	description: "Teamlinkt is a software facilitating team management, enabling users to track progress, assign tasks, and coordinate activities.",
	icon: "TeamLinkt.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "teamlinkt:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^TeamLinkt$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "teamlinkt:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^teamlinkt$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
