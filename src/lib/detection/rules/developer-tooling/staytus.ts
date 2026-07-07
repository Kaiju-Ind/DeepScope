import type { TechnologyDefinition } from '../../types';

export const staytusTechnologyDefinition = {
	id: "staytus",
	name: "Staytus",
	website: "https://staytus.co",
	description: "Staytus is a free, open-source status site that you can install on your own servers.",
	icon: "Staytus.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "staytus:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Staytus\\/([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "staytus:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^staytus\\/([\\d\\.]+)$", "i"),
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
