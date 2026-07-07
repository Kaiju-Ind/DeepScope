import type { TechnologyDefinition } from '../../types';

export const hotjarTechnologyDefinition = {
	id: "hotjar",
	name: "Hotjar",
	website: "https://www.hotjar.com",
	description: "Hotjar is a suite of analytic tools to assist in the gathering of qualitative data, providing feedback through tools such as heatmaps, session recordings, and surveys.",
	icon: "Hotjar.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hotjar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/static\\.hotjar\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hotjar:jsGlobal:1",
			kind: "jsGlobal",
			property: "HotLeadfactory",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hotjar:jsGlobal:2",
			kind: "jsGlobal",
			property: "HotleadController",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hotjar:jsGlobal:3",
			kind: "jsGlobal",
			property: "hj.apiUrlBase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hotjar:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("[\"']For security reasons, Hotjar only works over HTTPS\\. Learn more: https:\\/\\/help\\.hotjar\\.com\\/hc\\/en-us\\/articles\\/115011624047[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "hotjar:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("[\"']Hotjar not launching due to suspicious userAgent:[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "hotjar:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("[\"']start:hotjar[\"']"),
			confidence: 65,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "hotjar:resourceUrl:modern:3",
			kind: "resourceUrl",
			pattern: new RegExp("static\\.hotjar\\.com"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
