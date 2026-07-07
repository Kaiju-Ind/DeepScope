import type { TechnologyDefinition } from '../../types';

export const apacheTrafficServerTechnologyDefinition = {
	id: "apache-traffic-server",
	name: "Apache Traffic Server",
	website: "https://trafficserver.apache.org/",
	description: "Apache Traffic Server is an open-source caching and proxying server that serves as an HTTP/1.1 and HTTP/2 reverse proxy with caching capabilities, load balancing, request routing, SSL termination, and support for advanced HTTP features.",
	icon: "Apache Traffic Server.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "apache-traffic-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("ATS\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-traffic-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("ats\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:traffic_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
