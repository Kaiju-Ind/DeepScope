import type { TechnologyDefinition } from '../../types';

export const apacheHttpServerTechnologyDefinition = {
	id: "apache-http-server",
	name: "Apache HTTP Server",
	website: "https://httpd.apache.org/",
	description: "Apache HTTP Server is an open-source web server for serving static and dynamic websites.",
	icon: "Apache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "apache-http-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("(?:Apache(?:$|\\/([\\d.]+)|[^/-])|(?:^|\\b)HTTPD)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-http-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("(?:apache(?:$|\\/([\\d.]+)|[^/-])|(?:^|\\b)httpd)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:http_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
