import type { TechnologyDefinition } from '../../types';

export const powsterTechnologyDefinition = {
	id: "powster",
	name: "Powster",
	website: "https://powster.com",
	description: "Powster is a creative studio specialising in analytics, offering data-driven insights to enhance and optimise creative projects.",
	icon: "Powster.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "powster:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracking\\.powster\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "powster:jsGlobal:1",
			kind: "jsGlobal",
			property: "powsterGtag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powster:jsGlobal:2",
			kind: "jsGlobal",
			property: "powsterOneTrust",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "powster:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Powster$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "powster:meta:4",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^powster$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
