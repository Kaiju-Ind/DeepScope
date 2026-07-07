import type { TechnologyDefinition } from '../../types';

export const oracleApplicationServerTechnologyDefinition = {
	id: "oracle-application-server",
	name: "Oracle Application Server",
	website: "https://www.oracle.com/technetwork/middleware/ias/overview/index.html",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "oracle-application-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Oracle[- ]Application[- ]Server(?: Containers for J2EE)?(?:[- ](\\d[\\da-z./]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oracle-application-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("oracle[- ]application[- ]server(?: containers for j2ee)?(?:[- ](\\d[\\da-z./]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:oracle:application_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
