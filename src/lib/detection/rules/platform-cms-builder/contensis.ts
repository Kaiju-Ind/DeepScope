import type { TechnologyDefinition } from '../../types';

export const contensisTechnologyDefinition = {
	id: "contensis",
	name: "Contensis",
	website: "https://zengenti.com/en-gb/products/contensis",
	description: "Contensis is a content management system and headless CMS by Zengenti.",
	icon: "Contensis.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "contensis:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Contensis CMS Version ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "contensis:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("contensis cms version ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:zengenti:contensis:*:*:*:*:*:*:*:*",
	},
	implies: [
		"cfml",
		"java",
	],
} as const satisfies TechnologyDefinition;
