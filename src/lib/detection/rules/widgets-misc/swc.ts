import type { TechnologyDefinition } from '../../types';

export const swcTechnologyDefinition = {
	id: "swc",
	name: "SWC",
	website: "https://swc.rs",
	description: "SWC is an extensible Rust-based platform for the next generation of fast developer tools.",
	icon: "swc.svg",
	categories: [
		"widgets-misc",
	],
	rules: [],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
