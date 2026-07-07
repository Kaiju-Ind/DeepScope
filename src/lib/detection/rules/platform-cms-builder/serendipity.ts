import type { TechnologyDefinition } from '../../types';

export const serendipityTechnologyDefinition = {
	id: "serendipity",
	name: "Serendipity",
	website: "https://s9y.org",
	icon: "Serendipity.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "serendipity:meta:0",
			kind: "meta",
			key: "Powered-By",
			valuePattern: new RegExp("Serendipity v\\.([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "serendipity:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Serendipity(?: v\\.([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "serendipity:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("serendipity(?: v\\.([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "serendipity:meta:3",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("serendipity v\\.([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:s9y:serendipity:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
