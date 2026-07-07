import type { TechnologyDefinition } from '../../types';

export const basilCssTechnologyDefinition = {
	id: "basil-css",
	name: "Basil.css",
	website: "https://basilcss.com",
	description: "Basil.css is a responsive and customizable UI framework.",
	icon: "basilcss.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "basil-css:dom:0",
			kind: "dom",
			selector: "link[href*='/basil.css'], link[href*='/basilcss']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
