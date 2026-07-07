import type { TechnologyDefinition } from '../../types';

export const twikiTechnologyDefinition = {
	id: "twiki",
	name: "TWiki",
	website: "https://twiki.org",
	description: "TWiki is an open-source wiki and application platform.",
	icon: "TWiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "twiki:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:TWikiJavascripts|twikilib(?:\\.min)?\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twiki:html:1",
			kind: "html",
			pattern: new RegExp("<img [^>]*(?:title|alt)=\"This site is powered by the TWiki collaboration platform"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "twiki:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^TWIKISID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "twiki:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("(?:twikijavascripts|twikilib(?:\\.min)?\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twiki:html:4",
			kind: "html",
			pattern: new RegExp("<img [^>]*(?:title|alt)=\"this site is powered by the twiki collaboration platform"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "twiki:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^twikisid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:twiki:twiki:*:*:*:*:*:*:*:*",
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
