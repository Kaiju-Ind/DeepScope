import type { TechnologyDefinition } from '../../types';

export const typepadTechnologyDefinition = {
	id: "typepad",
	name: "TypePad",
	website: "https://www.typepad.com",
	description: "Typepad is a blog hosting service.",
	icon: "TypePad.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "typepad:url:0",
			kind: "url",
			pattern: new RegExp("typepad\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "typepad:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("typepad", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
