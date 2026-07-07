import type { TechnologyDefinition } from '../../types';

export const bloghunchTechnologyDefinition = {
	id: "bloghunch",
	name: "BlogHunch",
	website: "https://bloghunch.com",
	description: "BlogHunch is a content optimization platform that uses data-driven insights to help produce search-optimized articles designed to improve rankings and conversion performance with minimal manual effort.",
	icon: "BlogHunch.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bloghunch:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.bloghunch\\.test\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bloghunch:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^BlogHunch$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bloghunch:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^bloghunch$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
