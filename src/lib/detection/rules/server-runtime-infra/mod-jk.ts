import type { TechnologyDefinition } from '../../types';

export const modJkTechnologyDefinition = {
	id: "mod-jk",
	name: "mod_jk",
	website: "https://tomcat.apache.org/tomcat-3.3-doc/mod_jk-howto.html",
	description: "Mod_jk is an Apache module used to connect the Tomcat servlet container with web servers such as Apache, iPlanet, Sun ONE (formerly Netscape) and even IIS using the Apache JServ Protocol. A web server waits for client HTTP requests.",
	icon: "Apache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-jk:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_jk(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-jk:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_jk(?:\\/([\\d\\.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:apache:mod_jk:*:*:*:*:*:*:*:*",
	},
	implies: [
		"apache-http-server",
		"apache-tomcat",
	],
} as const satisfies TechnologyDefinition;
