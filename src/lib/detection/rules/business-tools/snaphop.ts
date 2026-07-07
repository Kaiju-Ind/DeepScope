import type { TechnologyDefinition } from '../../types';

export const snaphopTechnologyDefinition = {
	id: "snaphop",
	name: "SnapHop",
	website: "https://snaphop.com",
	description: "SnapHop is a recruitment marketing platform that helps organizations attract, engage, and convert job seekers through targeted employer branding and outreach strategies.",
	icon: "SnapHop.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "snaphop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.snaphop-analytics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "snaphop:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SnapHop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "snaphop:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^snaphop$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
