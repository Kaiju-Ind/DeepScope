import type { TechnologyDefinition } from '../../types';

export const phprsTechnologyDefinition = {
	id: "phprs",
	name: "phpRS",
	website: "https://phprs.net",
	description: "phpRS is a content management software written in PHP.",
	icon: "default.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "phprs:dom:0",
			kind: "dom",
			selector: "a[href*='.php']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "phprs:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phpRS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "phprs:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phprs$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
