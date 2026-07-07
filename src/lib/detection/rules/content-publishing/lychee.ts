import type { TechnologyDefinition } from '../../types';

export const lycheeTechnologyDefinition = {
	id: "lychee",
	name: "Lychee",
	website: "https://lycheeorg.github.io",
	description: "Lychee is a photo-management tool designed to operate on your server or web-space.",
	icon: "Lychee.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "lychee:jsGlobal:0",
			kind: "jsGlobal",
			property: "lychee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lychee:jsGlobal:1",
			kind: "jsGlobal",
			property: "lychee.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lychee:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Lychee v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lychee:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("lychee v([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lycheeorg:lychee:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
