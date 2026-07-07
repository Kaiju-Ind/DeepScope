import type { TechnologyDefinition } from '../../types';

export const http2TechnologyDefinition = {
	id: "http-2",
	name: "HTTP/2",
	website: "https://http2.github.io",
	description: "HTTP/2 (originally named HTTP/2.0) is a major revision of the HTTP network protocol used by the World Wide Web.",
	icon: "HTTP2.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "http-2:header:0",
			kind: "header",
			key: "Alt-Svc",
			valuePattern: new RegExp("h2", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-2:header:1",
			kind: "header",
			key: "X-Firefox-Spdy",
			valuePattern: new RegExp("h2", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-2:header:2",
			kind: "header",
			key: "alt-svc",
			valuePattern: new RegExp("h2", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "http-2:header:3",
			kind: "header",
			key: "x-firefox-spdy",
			valuePattern: new RegExp("h2", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	excludes: [
		"spdy",
	],
} as const satisfies TechnologyDefinition;
