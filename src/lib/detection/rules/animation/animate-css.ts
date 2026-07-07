import type { TechnologyDefinition } from '../../types';

export const animateCssTechnologyDefinition = {
	id: "animate-css",
	name: "Animate.css",
	website: "https://animate.style",
	description: "Animate.css is a ready-to-use library collection of CSS3 animation effects.",
	icon: "Animate.css.svg",
	categories: [
		"animation",
		"component-library",
	],
	rules: [
		{
			id: "animate-css:dom:0",
			kind: "dom",
			selector: ".animate__animated",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "animate-css:dom:1",
			kind: "dom",
			selector: "link[href*='animate']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
