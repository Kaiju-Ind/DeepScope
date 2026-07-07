import type { TechnologyDefinition } from '../../types';

export const w3CssTechnologyDefinition = {
	id: "w3-css",
	name: "W3.CSS",
	website: "https://www.w3schools.com/w3css/",
	description: "W3. CSS is a CSS framework developed by the World Wide Web Consortium (W3C), the main international standards organization for the World Wide Web.",
	icon: "W3.CSS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "w3-css:dom:0",
			kind: "dom",
			selector: "link[href*='/w3.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
