import type { TechnologyDefinition } from '../../types';

export const bsaleTechnologyDefinition = {
	id: "bsale",
	name: "Bsale",
	website: "https://www.bsale.cl",
	description: "Bsale is an store management solution for retail businesses that sell both in store and online.",
	icon: "Bsale.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bsale:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bsale.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bsale:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_bsalemarket_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bsale:meta:2",
			kind: "meta",
			key: "autor",
			valuePattern: new RegExp("Bsale", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bsale:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Bsale", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bsale:meta:4",
			kind: "meta",
			key: "autor",
			valuePattern: new RegExp("bsale", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bsale:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("bsale", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"nginx",
	],
} as const satisfies TechnologyDefinition;
