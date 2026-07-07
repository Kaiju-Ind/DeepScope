import type { TechnologyDefinition } from '../../types';

export const kobalteTechnologyDefinition = {
	id: "kobalte",
	name: "Kobalte",
	website: "https://kobalte.dev",
	description: "Kobalte is an UI toolkit for building accessible web apps and design systems with SolidJS.",
	icon: "kobalte.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "kobalte:dom:0",
			kind: "dom",
			selector: "div[data-kb-top-layer], html[data-kb-theme]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kobalte:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^kb\\-color\\-mode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"solidjs",
	],
} as const satisfies TechnologyDefinition;
