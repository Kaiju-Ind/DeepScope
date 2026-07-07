import type { TechnologyDefinition } from '../../types';

export const cowboyTechnologyDefinition = {
	id: "cowboy",
	name: "Cowboy",
	website: "https://github.com/ninenines/cowboy",
	description: "Cowboy is a small, fast, modular HTTP server written in Erlang.",
	icon: "Cowboy.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "cowboy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Cowboy$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cowboy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cowboy$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"erlang",
	],
} as const satisfies TechnologyDefinition;
