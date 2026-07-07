import type { TechnologyDefinition } from '../../types';

export const edgecastTechnologyDefinition = {
	id: "edgecast",
	name: "EdgeCast",
	website: "https://www.edgecast.com",
	description: "EdgeCast is a content delivery network (CDN) that accelerated and delivers static content to users around the world.",
	icon: "EdgeCast.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "edgecast:url:0",
			kind: "url",
			pattern: new RegExp("https?:\\/\\/(?:[^/]+\\.)?edgecastcdn\\.net\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "edgecast:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^ECD\\s\\(\\S+\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "edgecast:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ecd\\s\\(\\s+\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
