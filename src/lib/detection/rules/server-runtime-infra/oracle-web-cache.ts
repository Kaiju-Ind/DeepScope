import type { TechnologyDefinition } from '../../types';

export const oracleWebCacheTechnologyDefinition = {
	id: "oracle-web-cache",
	name: "Oracle Web Cache",
	website: "https://oracle.com",
	description: "Oracle Web Cache is a browser and content management server, which improves the performance of web sites.",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "oracle-web-cache:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Oracle(?:AS)?[- ]Web[- ]Cache(?:[- /]([\\da-z./]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oracle-web-cache:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("oracle(?:as)?[- ]web[- ]cache(?:[- /]([\\da-z./]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oracle:web_cache:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
