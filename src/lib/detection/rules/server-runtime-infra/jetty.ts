import type { TechnologyDefinition } from '../../types';

export const jettyTechnologyDefinition = {
	id: "jetty",
	name: "Jetty",
	website: "https://www.eclipse.org/jetty",
	description: "Jetty is an open-source web server and servlet container known for its scalability and efficiency, supporting protocols like HTTP and WebSocket for various applications from development tools to cloud services.",
	icon: "Jetty.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "jetty:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Jetty(?:\\(([\\d\\.]*\\d+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jetty:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("jetty(?:\\(([\\d\\.]*\\d+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:eclipse:jetty:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
