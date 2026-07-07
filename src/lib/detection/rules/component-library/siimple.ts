import type { TechnologyDefinition } from '../../types';

export const siimpleTechnologyDefinition = {
	id: "siimple",
	name: "siimple",
	website: "https://siimple.xyz",
	description: "siimple is a minimal CSS toolkit for building flat, clean and responsive web designs.",
	icon: "siimple.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "siimple:dom:0",
			kind: "dom",
			selector: "link[href*='siimple.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
