import type { TechnologyDefinition } from '../../types';

export const valibotTechnologyDefinition = {
	id: "valibot",
	name: "Valibot",
	website: "https://valibot.dev/",
	description: "The modular and type safe schema library",
	categories: [
		"form-schema-library",
	],
	rules: [
		{
			id: "valibot:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("valibot[.\\-@/]"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "valibot:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("node_modules\\/valibot"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "valibot:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"ValiError\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "valibot:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"valibot\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "valibot:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"valibotResolver\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "valibot:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("valibotResolver"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "valibot:resourceUrl:modern:6",
			kind: "resourceUrl",
			pattern: new RegExp("hookform.*resolvers.*valibot"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "valibot:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("resolvers\\/valibot"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
