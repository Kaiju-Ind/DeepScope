import type { TechnologyDefinition } from '../../types';

export const jbossWebTechnologyDefinition = {
	id: "jboss-web",
	name: "JBoss Web",
	website: "https://jboss.org/jbossweb",
	icon: "JBoss Web.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "jboss-web:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("JBossWeb(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jboss-web:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("jbossweb(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:redhat:jbossweb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jboss-application-server",
	],
	excludes: [
		"apache-tomcat",
	],
} as const satisfies TechnologyDefinition;
