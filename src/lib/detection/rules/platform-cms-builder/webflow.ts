import type { TechnologyDefinition } from '../../types';

export const webflowTechnologyDefinition = {
	id: "webflow",
	name: "Webflow",
	website: "https://webflow.com",
	description: "Webflow is Software-as-a-Service (SaaS) for website building and hosting.",
	icon: "webflow.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webflow:dom:0",
			kind: "dom",
			selector: "html[data-wf-site]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "webflow:jsGlobal:1",
			kind: "jsGlobal",
			property: "Webflow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webflow:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Webflow", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webflow:jsGlobal:3",
			kind: "jsGlobal",
			property: "Webflow._.VERSION",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webflow:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("webflow", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "webflow:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.webflow\\.io\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "webflow:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.website-files\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "webflow:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("webflow\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
