import type { TechnologyDefinition } from '../../types';

export const nextJsTechnologyDefinition = {
	id: "next-js",
	name: "Next.js",
	website: "https://nextjs.org",
	description: "Next.js is a React framework for server-rendered, statically generated, and full-stack web applications.",
	icon: "Next.js.svg",
	categories: [
		"ui-library",
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "next-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "__NEXT_DATA__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "next.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-js:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Next\\.js ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "next-js:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\.next\\.react"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "next-js:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^NEXT_LOCALE$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "next-js:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^next\\.js ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "next-js:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("\\/_next\\/static\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:zeit:next.js:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
		"react",
	],
} as const satisfies TechnologyDefinition;
