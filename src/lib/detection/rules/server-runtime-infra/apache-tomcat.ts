import type { TechnologyDefinition } from '../../types';

export const apacheTomcatTechnologyDefinition = {
	id: "apache-tomcat",
	name: "Apache Tomcat",
	website: "https://tomcat.apache.org",
	description: "Apache Tomcat is an open-source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and WebSocket technologies.",
	icon: "Apache Tomcat.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "apache-tomcat:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^(?:Apache-Coyote|Apache Tomcat)(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-tomcat:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("\\bTomcat\\b(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-tomcat:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:apache-coyote|apache tomcat)(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-tomcat:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("\\btomcat\\b(?:-([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:tomcat:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
