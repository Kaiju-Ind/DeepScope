import type { TechnologyDefinition } from '../../types';

export const googleWebServerTechnologyDefinition = {
	id: "google-web-server",
	name: "Google Web Server",
	website: "https://en.wikipedia.org/wiki/Google_Web_Server",
	icon: "Google.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "google-web-server:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("gws", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "google-web-server:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("gws", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:google:web_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
