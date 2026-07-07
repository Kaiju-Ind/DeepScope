import type { TechnologyDefinition } from '../../types';

export const phenomicTechnologyDefinition = {
	id: "phenomic",
	name: "Phenomic",
	website: "https://phenomic.io/",
	description: "Phenomic is a modular website compiler.",
	icon: "Phenomic.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "phenomic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/phenomic\\.browser\\.[a-f0-9]+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "phenomic:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+id=\"phenomic(?:root)?\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "phenomic:dom:2",
			kind: "dom",
			selector: "[id^='phenomic']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;
