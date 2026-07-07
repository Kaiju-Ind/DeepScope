import type { TechnologyDefinition } from '../../types';

export const spdyTechnologyDefinition = {
	id: "spdy",
	name: "SPDY",
	website: "https://chromium.org/spdy",
	icon: "SPDY.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spdy:header:0",
			kind: "header",
			key: "X-Firefox-Spdy",
			valuePattern: new RegExp("\\d\\.\\d", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "spdy:header:1",
			kind: "header",
			key: "x-firefox-spdy",
			valuePattern: new RegExp("\\d\\.\\d", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	excludes: [
		"http-2",
	],
} as const satisfies TechnologyDefinition;
