import type { TechnologyDefinition } from '../../types';

export const directusTechnologyDefinition = {
	id: "directus",
	name: "Directus",
	website: "https://directus.io",
	description: "Directus is a free and open-source headless CMS framework for managing custom SQL-based databases.",
	icon: "Directus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "directus:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Directus$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "directus:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^directus$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:monospace:directus:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"core-js",
		"tinymce",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
