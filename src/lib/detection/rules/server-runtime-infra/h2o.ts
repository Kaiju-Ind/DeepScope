import type { TechnologyDefinition } from '../../types';

export const h2oTechnologyDefinition = {
	id: "h2o",
	name: "H2O",
	website: "https://github.com/h2o/h2o",
	description: "H2O is a fast and secure HTTP/2 server written in C by Kazuho Oku.",
	icon: "default.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "h2o:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^h2o_casper$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "h2o:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^h2o(?:\\/)?([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "h2o:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^h2o(?:\\/)?([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"c",
		"http-2",
	],
} as const satisfies TechnologyDefinition;
