import type { TechnologyDefinition } from '../../types';

export const opengrokTechnologyDefinition = {
	id: "opengrok",
	name: "OpenGrok",
	website: "https://hub.opensolaris.org/bin/view/Project+opengrok/WebHome",
	icon: "OpenGrok.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "opengrok:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^OpenGrok$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "opengrok:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("OpenGrok(?: v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "opengrok:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^opengrok$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "opengrok:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("opengrok(?: v?([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
