import type { TechnologyDefinition } from '../../types';

export const dartTechnologyDefinition = {
	id: "dart",
	name: "Dart",
	website: "https://dart.dev",
	description: "Dart is an open-source, general-purpose, object-oriented programming language developed by Google.",
	icon: "Dart.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "dart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:\\.)?(?:dart)(?:\\.js)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dart:jsGlobal:1",
			kind: "jsGlobal",
			property: "$__dart_deferred_initializers__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dart:jsGlobal:2",
			kind: "jsGlobal",
			property: "___dart__$dart_dartObject_ZxYxX_0_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dart:jsGlobal:3",
			kind: "jsGlobal",
			property: "___dart_dispatch_record_ZxYxX_0_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dart:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^DARTSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
