import type { TechnologyDefinition } from '../../types';

export const decimalJsTechnologyDefinition = {
	id: "decimal-js",
	name: "decimal.js",
	website: "https://mikemcl.github.io/decimal.js/",
	icon: "decimal.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "decimal-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("decimal[.-]([\\d.]*\\d+)(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "decimal-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/([\\d.]*\\d+)\\/decimal(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "decimal-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("decimal(?:\\.min)?\\.js(?:\\?ver(?:sion)?=([\\d.]*\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "decimal-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "Decimal.ROUND_HALF_FLOOR",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
