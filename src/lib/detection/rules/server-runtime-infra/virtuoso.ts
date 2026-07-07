import type { TechnologyDefinition } from '../../types';

export const virtuosoTechnologyDefinition = {
	id: "virtuoso",
	name: "Virtuoso",
	website: "https://virtuoso.openlinksw.com/",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "virtuoso:url:0",
			kind: "url",
			pattern: new RegExp("\\/sparql"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "virtuoso:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Virtuoso\\/?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "virtuoso:meta:2",
			kind: "meta",
			key: "Copyright",
			valuePattern: new RegExp("^Copyright &copy; \\d{4} OpenLink Software", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "virtuoso:meta:3",
			kind: "meta",
			key: "Keywords",
			valuePattern: new RegExp("^OpenLink Virtuoso Sparql", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "virtuoso:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("virtuoso\\/?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "virtuoso:meta:5",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^copyright &copy; \\d{4} openlink software", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "virtuoso:meta:6",
			kind: "meta",
			key: "keywords",
			valuePattern: new RegExp("^openlink virtuoso sparql", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:openlinksw:virtuoso:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
