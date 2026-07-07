import type { TechnologyDefinition } from '../../types';

export const cheerpjTechnologyDefinition = {
	id: "cheerpj",
	name: "CheerPJ",
	website: "https://cheerpj.com",
	description: "CheerpJ is a WebAssembly-based Java Virtual Machine and OpenJDK distribution designed to run Java applications in modern browsers.",
	icon: "CheerPJ.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "cheerpj:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cheerpj\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "cheerpj:jsGlobal:1",
			kind: "jsGlobal",
			property: "CheerpJDataFolder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cheerpj:jsGlobal:2",
			kind: "jsGlobal",
			property: "CheerpJDevFolder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cheerpj:jsGlobal:3",
			kind: "jsGlobal",
			property: "CheerpJWebFolder",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
