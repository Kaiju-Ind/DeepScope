import type { TechnologyDefinition } from '../../types';

export const hiawathaTechnologyDefinition = {
	id: "hiawatha",
	name: "Hiawatha",
	website: "https://gitlab.com/hsleisink/hiawatha",
	description: "Hiawatha is a secure, lightweight web server developed by Hugo Leisink, designed for ease of use and advanced security features such as protection against SQL injections, XSS, and CSRF attacks.",
	icon: "Hiawatha.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hiawatha:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Hiawatha v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hiawatha:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("hiawatha v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:hiawatha-webserver:hiawatha:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
