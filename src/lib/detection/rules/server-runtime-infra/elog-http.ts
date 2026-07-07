import type { TechnologyDefinition } from '../../types';

export const elogHttpTechnologyDefinition = {
	id: "elog-http",
	name: "ELOG HTTP",
	website: "https://midas.psi.ch/elog",
	icon: "ELOG.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "elog-http:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("ELOG HTTP ?([\\d.-]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "elog-http:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("elog http ?([\\d.-]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"elog",
	],
} as const satisfies TechnologyDefinition;
