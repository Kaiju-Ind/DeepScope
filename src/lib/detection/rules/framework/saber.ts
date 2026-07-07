import type { TechnologyDefinition } from '../../types';

export const saberTechnologyDefinition = {
	id: "saber",
	name: "Saber",
	website: "https://saber.land/",
	description: "Saber is a framework for building static websites.",
	icon: "Saber.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "saber:html:0",
			kind: "html",
			pattern: new RegExp("<div [^>]*id=\"_saber\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "saber:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Saber v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "saber:dom:2",
			kind: "dom",
			selector: "div[id*='_saber']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "saber:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^saber v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
