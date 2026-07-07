import type { TechnologyDefinition } from '../../types';

export const xregexpTechnologyDefinition = {
	id: "xregexp",
	name: "XRegExp",
	website: "https://xregexp.com",
	icon: "XRegExp.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "xregexp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("xregexp[.-]([\\d.]*\\d)[^/]*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xregexp:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/([\\d.]+)\\/xregexp(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xregexp:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("xregexp.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xregexp:jsGlobal:3",
			kind: "jsGlobal",
			property: "XRegExp.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
