import type { TechnologyDefinition } from '../../types';

export const weblogicServerTechnologyDefinition = {
	id: "weblogic-server",
	name: "Weblogic Server",
	website: "https://www.oracle.com/java/weblogic",
	description: "WebLogic Server is an Application Server that runs on a middle tier, between back-end databases and related applications and browser-based thin clients.",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "weblogic-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^WebLogic\\sServer\\s([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "weblogic-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^weblogic\\sserver\\s([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"javaserver-pages",
	],
} as const satisfies TechnologyDefinition;
