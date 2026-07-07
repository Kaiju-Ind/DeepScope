import type { TechnologyDefinition } from '../../types';

export const lighttpdTechnologyDefinition = {
	id: "lighttpd",
	name: "lighttpd",
	website: "https://www.lighttpd.net",
	description: "Lighttpd is an open-source web server optimised for speed-critical environment.",
	icon: "lighttpd.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "lighttpd:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("(?:L|l)ight(?:y)?(?:tpd)?(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "lighttpd:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("(?:l|l)ight(?:y)?(?:tpd)?(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lighttpd:lighttpd:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
