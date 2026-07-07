import type { TechnologyDefinition } from '../../types';

export const heapTechnologyDefinition = {
	id: "heap",
	name: "Heap",
	website: "https://heap.io",
	description: "Heap is an analytics platform.",
	icon: "Heap.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "heap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.heapanalytics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heap:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("heap-\\d+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heap:jsGlobal:2",
			kind: "jsGlobal",
			property: "heap.version.heapJsVersion",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "heap:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("sendRewriteAndHeapIgnoreTelemetry:"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "heap:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.CsSideloadsHeap\\s*=\\s*[\"']cs_sideloads_heap[\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "heap:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("\\bmakeHeapIgnoreSelector\\b"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "heap:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.heapanalytics\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
		],
	},
} as const satisfies TechnologyDefinition;
