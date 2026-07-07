import type { TechnologyDefinition } from '../../types';

export const jbossApplicationServerTechnologyDefinition = {
	id: "jboss-application-server",
	name: "JBoss Application Server",
	website: "https://jboss.org/jbossas.html",
	icon: "JBoss Application Server.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "jboss-application-server:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("JBoss(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jboss-application-server:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("jboss(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:redhat:jboss_application_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
