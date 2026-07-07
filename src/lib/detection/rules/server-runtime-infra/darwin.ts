import type { TechnologyDefinition } from '../../types';

export const darwinTechnologyDefinition = {
	id: "darwin",
	name: "Darwin",
	website: "https://opensource.apple.com",
	description: "Darwin is the open-source operating system from Apple that forms the basis for macOS.",
	icon: "Apple.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "darwin:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Darwin", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "darwin:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Darwin", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "darwin:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("darwin", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "darwin:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("darwin", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
