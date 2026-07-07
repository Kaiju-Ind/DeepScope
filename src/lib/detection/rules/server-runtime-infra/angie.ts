import type { TechnologyDefinition } from '../../types';

export const angieTechnologyDefinition = {
	id: "angie",
	name: "Angie",
	website: "https://angie.software/en/",
	description: "Angie is a drop-in replacement for the Nginx web server aiming to extend the functionality of the original version.",
	icon: "default.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "angie:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Angie(?:\\/([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "angie:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^angie(?:\\/([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"c",
		"perl",
	],
} as const satisfies TechnologyDefinition;
