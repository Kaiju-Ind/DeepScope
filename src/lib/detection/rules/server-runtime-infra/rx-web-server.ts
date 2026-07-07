import type { TechnologyDefinition } from '../../types';

export const rxWebServerTechnologyDefinition = {
	id: "rx-web-server",
	name: "RX Web Server",
	website: "https://developers.rokitax.co.uk/projects/rxweb",
	icon: "RXWeb.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "rx-web-server:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("RX-WEB", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rx-web-server:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("rx-web", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
