import type { TechnologyDefinition } from '../../types';

export const caramellaTechnologyDefinition = {
	id: "caramella",
	name: "Caramella",
	website: "https://caramel.la",
	description: "Caramella is a blog creation tool from Saudi Arabia that enables blog development and content management.",
	icon: "Caramella.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "caramella:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.caramel\\.la"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "caramella:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^caramella$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
