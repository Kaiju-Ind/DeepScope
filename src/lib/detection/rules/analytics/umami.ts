import type { TechnologyDefinition } from '../../types';

export const umamiTechnologyDefinition = {
	id: "umami",
	name: "Umami",
	website: "https://umami.is/",
	description: "Umami is a self-hosted web analytics solution. It's goal is to provide a friendlier, privacy-focused alternative to Google Analytics and a free, open-sourced alternative to paid solutions.",
	icon: "umami.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "umami:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("umami\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "umami:jsGlobal:1",
			kind: "jsGlobal",
			property: "umami",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umami:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("['\"]\\s*x-umami-cache\\s*['\"]"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "umami:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("data-umami-event-"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "umami:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("api-gateway\\.umami\\.dev"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
