import type { TechnologyDefinition } from '../../types';

export const goaheadTechnologyDefinition = {
	id: "goahead",
	name: "GoAhead",
	website: "https://embedthis.com/products/goahead/index.html",
	icon: "GoAhead.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "goahead:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("GoAhead", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "goahead:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("goahead", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:embedthis:goahead:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
