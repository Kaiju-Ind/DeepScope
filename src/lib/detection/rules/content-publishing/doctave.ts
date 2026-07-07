import type { TechnologyDefinition } from '../../types';

export const doctaveTechnologyDefinition = {
	id: "doctave",
	name: "Doctave",
	website: "https://www.doctave.com",
	description: "Doctave is a platform for creating modern Markdown and OpenAPI-based developer documentation portals using a Git-friendly docs-as-code workflow.",
	icon: "Doctave.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "doctave:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Doctave$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "doctave:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^doctave$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
