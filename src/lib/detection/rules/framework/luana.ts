import type { TechnologyDefinition } from '../../types';

export const luanaTechnologyDefinition = {
	id: "luana",
	name: "Luana",
	website: "https://luanaframework.github.io",
	description: "Luana is a web framework that uses web browser APIs and features to make a cross-platform web app look like a Native one and bring the same experience.",
	icon: "Luana.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "luana:jsGlobal:0",
			kind: "jsGlobal",
			property: "luanaframework",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "luana:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Luana\\sFramework\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "luana:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^luana\\sframework\\s([\\d\\.]+)$", "i"),
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
	implies: [
		"pwa",
	],
} as const satisfies TechnologyDefinition;
