import type { TechnologyDefinition } from '../../types';

export const touch2successTechnologyDefinition = {
	id: "touch2success",
	name: "Touch2Success",
	website: "https://www.touch2success.com",
	description: "Touch2Success is a fully featured restaurant POS software designed to serve startups, enterprises.",
	icon: "Touch2Success.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "touch2success:meta:0",
			kind: "meta",
			key: "content",
			valuePattern: new RegExp("^Touch2Success$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "touch2success:meta:1",
			kind: "meta",
			key: "content",
			valuePattern: new RegExp("^touch2success$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
