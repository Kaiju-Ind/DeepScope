import type { TechnologyDefinition } from '../../types';

export const vrioTechnologyDefinition = {
	id: "vrio",
	name: "Vrio",
	website: "https://www.vrio.com",
	description: "Vrio is a headless ecommerce platform offering API-driven and hosted solutions for building and managing online stores.",
	icon: "Vrio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vrio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.vrio\\.app"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "vrio:meta:1",
			kind: "meta",
			key: "readme-subdomain",
			valuePattern: new RegExp("^vrio-api$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
