import type { TechnologyDefinition } from '../../types';

export const sourceyTechnologyDefinition = {
	id: "sourcey",
	name: "Sourcey",
	website: "https://sourcey.com",
	description: "Sourcey is an open-source documentation platform and static site generator.",
	icon: "default.svg",
	categories: [
		"content-publishing",
		"framework",
	],
	rules: [
		{
			id: "sourcey:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Sourcey(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sourcey:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sourcey(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
