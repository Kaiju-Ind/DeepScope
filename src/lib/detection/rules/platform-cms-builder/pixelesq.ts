import type { TechnologyDefinition } from '../../types';

export const pixelesqTechnologyDefinition = {
	id: "pixelesq",
	name: "Pixelesq",
	website: "https://www.pixelesq.com",
	description: "Pixelesq is a no-code platform that uses AI tools to generate and manage websites with structured control over SEO, accessibility, performance, and branding standards.",
	icon: "Pixelesq.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixelesq:dom:0",
			kind: "dom",
			selector: "div[data-accent-color*='pixelesq']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pixelesq:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Pixelesq\\s-\\sAI\\sWebsite\\sBuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pixelesq:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^pixelesq\\s-\\sai\\swebsite\\sbuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pixelesq:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Pixelesq", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"next-js",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
