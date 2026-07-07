import type { TechnologyDefinition } from '../../types';

export const twistedwebTechnologyDefinition = {
	id: "twistedweb",
	name: "TwistedWeb",
	website: "https://twistedmatrix.com/trac/wiki/TwistedWeb",
	icon: "TwistedWeb.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "twistedweb:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("TwistedWeb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "twistedweb:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("twistedweb(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:twistedmatrix:twistedweb:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
