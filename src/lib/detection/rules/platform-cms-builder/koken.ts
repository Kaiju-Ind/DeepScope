import type { TechnologyDefinition } from '../../types';

export const kokenTechnologyDefinition = {
	id: "koken",
	name: "Koken",
	website: "https://koken.me",
	description: "Koken is a free web site publishing system developed for photographers, designers, artists and creative DIYs.",
	icon: "Koken.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "koken:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("koken(?:\\.js\\?([\\d.]+)|\\/storage)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "koken:html:1",
			kind: "html",
			pattern: new RegExp("<html lang=\"en\" class=\"k-source-essays k-lens-essays\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koken:html:2",
			kind: "html",
			pattern: new RegExp("<!--\\s+KOKEN DEBUGGING"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koken:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^koken_referrer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "koken:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Koken ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "koken:dom:5",
			kind: "dom",
			selector: "html[lang='en'][class*='k-source-essays']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "koken:html:6",
			kind: "html",
			pattern: new RegExp("<!--\\s+koken debugging"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "koken:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("koken ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
