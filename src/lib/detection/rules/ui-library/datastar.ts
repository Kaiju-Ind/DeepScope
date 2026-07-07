import type { TechnologyDefinition } from '../../types';

export const datastarTechnologyDefinition = {
	id: "datastar",
	name: "Datastar",
	website: "https://data-star.dev",
	description: "Datastar is a lightweight framework for developing websites and real-time collaborative web applications.",
	icon: "Datastar.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "datastar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/(?:[^/]+\\/.*)?datastar\\.js(?:\\?.*)?$"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
