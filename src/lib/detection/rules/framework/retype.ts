import type { TechnologyDefinition } from '../../types';

export const retypeTechnologyDefinition = {
	id: "retype",
	name: "Retype",
	website: "https://retype.com",
	description: "Retype is an open-source static site generator built with Node.js that allows users to create and manage websites with ease using Markdown as the primary content format.",
	icon: "retype.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "retype:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Retype\\s([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "retype:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("retype\\s([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
