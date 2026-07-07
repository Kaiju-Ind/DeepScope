import type { TechnologyDefinition } from '../../types';

export const kangleTechnologyDefinition = {
	id: "kangle",
	name: "Kangle",
	website: "https://kangle.org",
	description: "Kangle is an open-source web server and reverse proxy software widely used in Chinese hosting environments for HTTP caching and virtual hosting.",
	icon: "Kangle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "kangle:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^kangle(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kangle:header:1",
			kind: "header",
			key: "x-cache",
			valuePattern: new RegExp("^MISS from (?:[\\w& ]+ )?kangle\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kangle:header:2",
			kind: "header",
			key: "x-cache",
			valuePattern: new RegExp("^miss from (?:[\\w& ]+ )?kangle\\b", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
