import type { TechnologyDefinition } from '../../types';

export const caddyTechnologyDefinition = {
	id: "caddy",
	name: "Caddy",
	website: "https://caddyserver.com",
	description: "Caddy is a Go-based web server known for its simplicity and automatic HTTPS features.",
	icon: "caddy.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "caddy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Caddy$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "caddy:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Caddy", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "caddy:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^caddy$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:caddyserver:caddy:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
	],
} as const satisfies TechnologyDefinition;
