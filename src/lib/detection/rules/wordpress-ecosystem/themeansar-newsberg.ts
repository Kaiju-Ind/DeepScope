import type { TechnologyDefinition } from '../../types';

export const themeansarNewsbergTechnologyDefinition = {
	id: "themeansar-newsberg",
	name: "Themeansar Newsberg",
	website: "https://themeansar.com/free-themes/newsberg",
	description: "Themeansar Newsberg is a fast, clean, modern-looking, responsive news magazine WordPress theme.",
	icon: "Themeansar.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themeansar-newsberg:dom:0",
			kind: "dom",
			selector: "link#newsberg-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
	excludes: [
		"themeansar-newsup",
	],
} as const satisfies TechnologyDefinition;
