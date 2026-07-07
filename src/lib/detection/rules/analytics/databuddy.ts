import type { TechnologyDefinition } from '../../types';

export const databuddyTechnologyDefinition = {
	id: "databuddy",
	name: "Databuddy",
	website: "https://www.databuddy.cc",
	description: "Databuddy is an analytics platform designed for developers.",
	icon: "Databuddy.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "databuddy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.databuddy\\.cc"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "databuddy:meta:1",
			kind: "meta",
			key: "creator",
			valuePattern: new RegExp("^Databuddy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "databuddy:meta:2",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Databuddy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "databuddy:meta:3",
			kind: "meta",
			key: "creator",
			valuePattern: new RegExp("^databuddy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "databuddy:meta:4",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^databuddy$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "databuddy:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.databuddy\\.cc"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
