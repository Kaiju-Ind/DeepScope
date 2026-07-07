import type { TechnologyDefinition } from '../../types';

export const yawsTechnologyDefinition = {
	id: "yaws",
	name: "Yaws",
	website: "https://github.com/erlyaws/yaws",
	description: "Yaws (Yet Another Web Server) is an open-source web server designed to deliver dynamic content efficiently. It was developed by Claes (klacke) Wikström and is written in Erlang, a functional programming language.",
	icon: "Yaws.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "yaws:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Yaws(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "yaws:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("yaws(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:yaws:yaws:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
