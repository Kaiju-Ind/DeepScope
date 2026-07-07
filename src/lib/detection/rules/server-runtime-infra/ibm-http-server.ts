import type { TechnologyDefinition } from '../../types';

export const ibmHttpServerTechnologyDefinition = {
	id: "ibm-http-server",
	name: "IBM HTTP Server",
	website: "https://ibm.com/software/webservers/httpservers",
	icon: "IBM.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "ibm-http-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("IBM_HTTP_Server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ibm-http-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("ibm_http_server(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ibm:http_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
