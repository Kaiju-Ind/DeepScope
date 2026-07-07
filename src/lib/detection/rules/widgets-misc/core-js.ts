import type { TechnologyDefinition } from '../../types';

export const coreJsTechnologyDefinition = {
	id: "core-js",
	name: "core-js",
	website: "https://github.com/zloirock/core-js",
	description: "core-js is a modular standard library for JavaScript, with polyfills for cutting-edge ECMAScript features.",
	icon: "core-js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "core-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "__core-js_shared__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "core-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "__core-js_shared__.versions.0.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "core-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "_babelPolyfill",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "core-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "core",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "core-js:jsGlobal:4",
			kind: "jsGlobal",
			property: "core.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
