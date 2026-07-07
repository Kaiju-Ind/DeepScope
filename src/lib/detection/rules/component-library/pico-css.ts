import type { TechnologyDefinition } from '../../types';

export const picoCssTechnologyDefinition = {
	id: "pico-css",
	name: "Pico CSS",
	website: "https://picocss.com",
	description: "Pico CSS is a minimal CSS framework for semantic HTML, without using classes.",
	icon: "Pico CSS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "pico-css:dom:0",
			kind: "dom",
			selector: "link[href*='/pico.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pico-css:dom:1",
			kind: "dom",
			selector: "link[href*='/pico.min.css'], link[href*='picocss.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
