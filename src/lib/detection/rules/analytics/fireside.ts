import type { TechnologyDefinition } from '../../types';

export const firesideTechnologyDefinition = {
	id: "fireside",
	name: "Fireside",
	website: "https://fireside.fm",
	description: "Fireside is a platform that provides podcast hosting and analytics services.",
	icon: "Fireside.svg",
	categories: [
		"analytics",
		"media-video",
	],
	rules: [
		{
			id: "fireside:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("a\\.fireside\\.fm\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fireside:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Fireside\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fireside:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Fireside ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fireside:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^fireside\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fireside:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("fireside ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
