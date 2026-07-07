import type { TechnologyDefinition } from '../../types';

export const erlangTechnologyDefinition = {
	id: "erlang",
	name: "Erlang",
	website: "https://www.erlang.org",
	description: "Erlang is a general-purpose, concurrent, functional programming language, and a garbage-collected runtime system.",
	icon: "Erlang.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "erlang:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Erlang( OTP\\/(?:[\\d.ABR-]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "erlang:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Erlang(?: OTP\\/([\\d.ABR-]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "erlang:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("erlang( otp\\/(?:[\\d.abr-]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:erlang:erlang%2fotp:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
