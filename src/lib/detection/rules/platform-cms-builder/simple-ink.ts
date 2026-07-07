import type { TechnologyDefinition } from '../../types';

export const simpleInkTechnologyDefinition = {
	id: "simple-ink",
	name: "Simple.ink",
	website: "https://www.simple.ink",
	description: "Simple.ink allows you to build no-code websites with Notion.",
	icon: "Simple.ink.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simple-ink:dom:0",
			kind: "dom",
			selector: "html#simple-ink",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"notion",
	],
} as const satisfies TechnologyDefinition;
