import type { TechnologyDefinition } from '../../types';

export const ferronTechnologyDefinition = {
	id: "ferron",
	name: "Ferron",
	website: "https://ferron.sh",
	description: "Ferron is a web server offering automatic TLS certificate management, configuration, and security for online operations.",
	icon: "Ferron.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "ferron:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Ferron$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ferron:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ferron$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
