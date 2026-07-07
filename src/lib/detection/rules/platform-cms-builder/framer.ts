import type { TechnologyDefinition } from '../../types';

export const framerTechnologyDefinition = {
	id: "framer",
	name: "Framer",
	website: "https://framer.com/",
	description: "Framer is a platform for building interactive websites and apps.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "framer:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.framer\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "framer:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("\\.framercdn\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "framer:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("framerusercontent\\.com\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "framer:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("framer-design-system\\."),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
