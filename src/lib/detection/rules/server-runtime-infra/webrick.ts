import type { TechnologyDefinition } from '../../types';

export const webrickTechnologyDefinition = {
	id: "webrick",
	name: "WEBrick",
	website: "https://docs.ruby-lang.org/en/2.4.0/WEBrick.html",
	description: "WEBrick is a lightweight HTTP server library in Ruby, included in the standard library, primarily used for local development and testing of Ruby web applications.",
	icon: "Ruby.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "webrick:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^WEBrick\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "webrick:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^webrick\\/([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:ruby-lang:webrick:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
