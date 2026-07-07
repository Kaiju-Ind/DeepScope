import type { TechnologyDefinition } from '../../types';

export const discourseTechnologyDefinition = {
	id: "discourse",
	name: "Discourse",
	website: "https://discourse.org",
	description: "Discourse is an open-source internet forum and mailing list management software application.",
	icon: "Discourse.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "discourse:jsGlobal:0",
			kind: "jsGlobal",
			property: "Discourse",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "discourse:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Discourse(?: ?\\/?([\\d.]+\\d))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "discourse:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("discourse(?: ?\\/?([\\d.]+\\d))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:discourse:discourse:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
