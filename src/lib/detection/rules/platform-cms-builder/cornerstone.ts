import type { TechnologyDefinition } from '../../types';

export const cornerstoneTechnologyDefinition = {
	id: "cornerstone",
	name: "Cornerstone",
	website: "https://cornerstoneplatform.com",
	description: "Cornerstone is a content management system that includes modules for CRM and membership management.",
	icon: "Cornerstone.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cornerstone:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cornerstone(?:\\/assets)?(?:\\/js)?(?:\\/site)?(?:\\/cs-classic)?\\.?((?:\\d+\\.)+\\d+)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cornerstone:dom:1",
			kind: "dom",
			selector: "#cornerstone-generated-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cornerstone:jsGlobal:2",
			kind: "jsGlobal",
			property: "$CornerstoneArticleForms",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cornerstone:jsGlobal:3",
			kind: "jsGlobal",
			property: "Cornerstone.Audio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cornerstone:meta:4",
			kind: "meta",
			key: "Generator",
			valuePattern: new RegExp("^Cornerstone$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cornerstone:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^cornerstone$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
