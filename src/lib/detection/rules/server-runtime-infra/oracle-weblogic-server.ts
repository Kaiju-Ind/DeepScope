import type { TechnologyDefinition } from '../../types';

export const oracleWeblogicServerTechnologyDefinition = {
	id: "oracle-weblogic-server",
	name: "Oracle WebLogic Server",
	website: "https://www.oracle.com/java/weblogic/",
	description: "Oracle WebLogic Server is a Java-based application server that provides a platform for developing, deploying, and running enterprise-level Java applications.",
	icon: "Oracle.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:bea:weblogic_server:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
