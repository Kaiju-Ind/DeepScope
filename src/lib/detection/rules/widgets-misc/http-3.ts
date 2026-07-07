import type { TechnologyDefinition } from '../../types';

export const http3TechnologyDefinition = {
	id: "http-3",
	name: "HTTP/3",
	website: "https://httpwg.org/",
	description: "HTTP/3 is the third major version of the Hypertext Transfer Protocol used to exchange information on the World Wide Web.",
	icon: "HTTP3.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "http-3:header:0",
			kind: "header",
			key: "Alt-Svc",
			valuePattern: new RegExp("h3", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-3:header:1",
			kind: "header",
			key: "X-Firefox-Http3",
			valuePattern: new RegExp("h3", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-3:header:2",
			kind: "header",
			key: "alt-svc",
			valuePattern: new RegExp("h3", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-3:header:3",
			kind: "header",
			key: "x-firefox-http3",
			valuePattern: new RegExp("h3", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	excludes: [
		"http-2",
	],
} as const satisfies TechnologyDefinition;
