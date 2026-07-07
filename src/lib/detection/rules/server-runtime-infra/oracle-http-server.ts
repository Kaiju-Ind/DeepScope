import type { TechnologyDefinition } from '../../types';

export const oracleHttpServerTechnologyDefinition = {
	id: "oracle-http-server",
	name: "Oracle HTTP Server",
	website: "https://oracle.com",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "oracle-http-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Oracle-HTTP-Server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oracle-http-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("oracle-http-server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oracle:http_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
