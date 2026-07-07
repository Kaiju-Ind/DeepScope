import type { TechnologyDefinition } from '../../types';

export const flutterTechnologyDefinition = {
	id: "flutter",
	name: "Flutter",
	website: "https://flutter.dev",
	description: "Flutter is an open source framework by Google for building beautiful, natively compiled, multi-platform applications from a single codebase.",
	icon: "Flutter.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "flutter:jsGlobal:0",
			kind: "jsGlobal",
			property: "_flutter.loader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flutter:jsGlobal:1",
			kind: "jsGlobal",
			property: "_flutter_web_set_location_strategy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flutter:jsGlobal:2",
			kind: "jsGlobal",
			property: "flutterCanvasKit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flutter:meta:3",
			kind: "meta",
			key: "id",
			valuePattern: new RegExp("^flutterweb-theme$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:flutter:flutter:*:*:*:*:*:*:*:*",
	},
	implies: [
		"dart",
	],
} as const satisfies TechnologyDefinition;
