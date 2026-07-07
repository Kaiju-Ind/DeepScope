import type { TechnologyDefinition } from '../../types';

export const pliggTechnologyDefinition = {
	id: "pligg",
	name: "Pligg",
	website: "https://pligg.com",
	icon: "Pligg.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pligg:html:0",
			kind: "html",
			pattern: new RegExp("<span[^>]+id=\"xvotes-0"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pligg:jsGlobal:1",
			kind: "jsGlobal",
			property: "pligg_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pligg:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Pligg", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pligg:dom:3",
			kind: "dom",
			selector: "span[id^='xvotes-0']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pligg:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("pligg", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:pligg:pligg_cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
