import type { TechnologyDefinition } from '../../types';

export const dspaceTechnologyDefinition = {
	id: "dspace",
	name: "DSpace",
	website: "https://dspace.org/",
	description: "DSpace is a software platform for academic, non-profit, and commercial organizations to create and manage open digital repositories.",
	icon: "DSpace.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "dspace:jsGlobal:0",
			kind: "jsGlobal",
			property: "DSpaceChoiceLookup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dspace:jsGlobal:1",
			kind: "jsGlobal",
			property: "DSpaceChoicesSetup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dspace:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("DSpace ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dspace:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("dspace ([\\d.]+)", "i"),
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
