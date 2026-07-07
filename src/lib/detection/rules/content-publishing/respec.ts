import type { TechnologyDefinition } from '../../types';

export const respecTechnologyDefinition = {
	id: "respec",
	name: "ReSpec",
	website: "https://respec.org",
	description: "ReSpec is a technical documentation generator that simplifies the creation and maintenance of structured technical specifications and standards documents.",
	icon: "ReSpec.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "respec:jsGlobal:0",
			kind: "jsGlobal",
			property: "respecConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "respec:jsGlobal:1",
			kind: "jsGlobal",
			property: "respecVersion",
			valuePattern: new RegExp("([\\d.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "respec:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ReSpec ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "respec:meta:3",
			kind: "meta",
			key: "monetization",
			valuePattern: new RegExp("respec\\.org", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "respec:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("respec ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
