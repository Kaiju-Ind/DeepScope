import type { TechnologyDefinition } from '../../types';

export const vikretaTechnologyDefinition = {
	id: "vikreta",
	name: "Vikreta",
	website: "https://www.vikreta.app",
	description: "Vikreta is a web storefront and POS platform built with React, Next.js, and Tailwind CSS, deployed on Vercel and designed for dynamic product and order management.",
	icon: "Vikreta.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vikreta:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Vikreta$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vikreta:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^vikreta$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
