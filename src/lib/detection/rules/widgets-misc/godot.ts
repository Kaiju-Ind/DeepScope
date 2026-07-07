import type { TechnologyDefinition } from '../../types';

export const godotTechnologyDefinition = {
	id: "godot",
	name: "Godot",
	website: "https://godotengine.org",
	description: "Godot is a game engine that supports exporting to HTML5 with WebAssembly compatibility.",
	icon: "Godot.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "godot:jsGlobal:0",
			kind: "jsGlobal",
			property: "GODOT_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "godot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Godot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:godotengine:godot:*:*:*:*:*:*:*:*",
	},
	implies: [
		"webassembly",
	],
} as const satisfies TechnologyDefinition;
