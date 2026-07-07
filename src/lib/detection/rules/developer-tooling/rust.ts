import type { TechnologyDefinition } from '../../types';

export const rustTechnologyDefinition = {
	id: "rust",
	name: "Rust",
	website: "https://www.rust-lang.org",
	description: "Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency.",
	icon: "Rust.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "rust:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("TrunkApplicationStarted"),
			confidence: 100,
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:rust-lang:rust:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
