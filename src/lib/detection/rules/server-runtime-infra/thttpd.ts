import type { TechnologyDefinition } from '../../types';

export const thttpdTechnologyDefinition = {
	id: "thttpd",
	name: "thttpd",
	website: "https://acme.com/software/thttpd",
	icon: "thttpd.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "thttpd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("\\bthttpd(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "thttpd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\bthttpd(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:acme:thttpd:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
