import type { TechnologyDefinition } from '../../types';

export const metismenuTechnologyDefinition = {
	id: "metismenu",
	name: "metisMenu",
	website: "https://github.com/onokumus/metismenu",
	description: "metisMenu is a collapsible jQuery menu plugin.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "metismenu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/|\\.)metisMenu(?:js)?(?:\\.min)?\\.js(?:\\?([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metismenu:jsGlobal:1",
			kind: "jsGlobal",
			property: "MetisMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "metismenu:jsGlobal:2",
			kind: "jsGlobal",
			property: "metisMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "metismenu:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/|\\.)metismenu(?:js)?(?:\\.min)?\\.js(?:\\?([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
