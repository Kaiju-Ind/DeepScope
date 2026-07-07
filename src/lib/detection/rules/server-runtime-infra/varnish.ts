import type { TechnologyDefinition } from '../../types';

export const varnishTechnologyDefinition = {
	id: "varnish",
	name: "Varnish",
	website: "https://www.varnish-cache.org",
	description: "Varnish is a reverse caching proxy.",
	icon: "Varnish.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "varnish:header:0",
			kind: "header",
			key: "Via",
			valuePattern: new RegExp("varnish(?: \\(Varnish\\/([\\d.]+)\\))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "varnish:header:1",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("varnish(?: \\(varnish\\/([\\d.]+)\\))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "varnish:header:2",
			kind: "header",
			key: "Via",
			valuePattern: new RegExp("(\\d+(?:\\.\\d+)?)\\s+varnish", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:varnish-software:varnish_cache:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
