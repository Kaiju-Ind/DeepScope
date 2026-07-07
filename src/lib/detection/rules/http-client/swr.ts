import type { TechnologyDefinition } from '../../types';

export const swrTechnologyDefinition = {
	id: "swr",
	name: "SWR",
	website: "https://swr.vercel.app/",
	description: "React Hooks library for remote data fetching",
	categories: [
		"http-client",
	],
	rules: [
		{
			id: "swr:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("\\[\\[\"finite\",1],\\[\"revalidateOnFocus\",1],\\[\"revalidateOnReconnect\",1],\\[\"refreshInterval\",0]]"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("\"No fetcher function matched"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\"broadcast\\([^)]*\\):\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"serialized key: \""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"focus\",\"visibilitychange\",\"online\",\"offline\""),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\\$swr\\$.*?\\$cache\\$"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\\$cache\\$\\/.*?\\$swr\\$"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "swr:resourceUrl:modern:7",
			kind: "resourceUrl",
			pattern: new RegExp("swr(?:\\.min)?\\.js$", "i"),
			confidence: 45,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "swr:resourceUrl:modern:8",
			kind: "resourceUrl",
			pattern: new RegExp("swr\\.[a-f0-9]{8,}\\.js$", "i"),
			confidence: 45,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "swr:resourceUrl:modern:9",
			kind: "resourceUrl",
			pattern: new RegExp("use-swr\\.[a-f0-9]{8,}\\.js$", "i"),
			confidence: 45,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
