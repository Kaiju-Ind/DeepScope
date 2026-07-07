import type { TechnologyDefinition } from '../../types';

export const cnvertTechnologyDefinition = {
	id: "cnvert",
	name: "Cnvert",
	website: "https://cnvert.com",
	description: "Cnvert is a self-hosted lead and marketing automation system, formerly known as Sonician.",
	icon: "Cnvert.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cnvert:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Sonician AB$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cnvert:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^Sonician AB$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cnvert:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^sonician ab$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cnvert:meta:3",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^sonician ab$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
