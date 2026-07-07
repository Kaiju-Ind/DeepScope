import type { TechnologyDefinition } from '../../types';

export const nginxTechnologyDefinition = {
	id: "nginx",
	name: "Nginx",
	website: "https://nginx.org/en",
	description: "Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.",
	icon: "Nginx.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "nginx:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("nginx(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nginx:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("nginx(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:f5:nginx:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
