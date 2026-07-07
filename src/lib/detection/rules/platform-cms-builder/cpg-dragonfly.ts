import type { TechnologyDefinition } from '../../types';

export const cpgDragonflyTechnologyDefinition = {
	id: "cpg-dragonfly",
	name: "CPG Dragonfly",
	website: "https://dragonflycms.org",
	icon: "CPG Dragonfly.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cpg-dragonfly:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Dragonfly CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cpg-dragonfly:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("CPG Dragonfly", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cpg-dragonfly:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^dragonfly cms", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cpg-dragonfly:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cpg dragonfly", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
