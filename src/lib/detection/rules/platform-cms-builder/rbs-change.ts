import type { TechnologyDefinition } from '../../types';

export const rbsChangeTechnologyDefinition = {
	id: "rbs-change",
	name: "RBS Change",
	website: "https://www.rbschange.fr",
	icon: "RBS Change.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rbs-change:html:0",
			kind: "html",
			pattern: new RegExp("<html[^>]+xmlns:change="),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "rbs-change:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("RBS Change", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rbs-change:dom:2",
			kind: "dom",
			selector: "html[xmlns\\:change*='www.rbs.fr']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rbs-change:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("rbs change", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
