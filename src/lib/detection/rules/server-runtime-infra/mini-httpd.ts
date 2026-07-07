import type { TechnologyDefinition } from '../../types';

export const miniHttpdTechnologyDefinition = {
	id: "mini-httpd",
	name: "mini_httpd",
	website: "https://acme.com/software/mini_httpd",
	icon: "mini_httpd.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mini-httpd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mini_httpd(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mini-httpd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mini_httpd(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:acme:mini_httpd:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
