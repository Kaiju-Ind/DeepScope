import type { TechnologyDefinition } from '../../types';

export const cloudcannonTechnologyDefinition = {
	id: "cloudcannon",
	name: "CloudCannon",
	website: "https://cloudcannon.com",
	description: "CloudCannon is a web development platform and content management system (CMS).",
	icon: "CloudCannon.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cloudcannon:dom:0",
			kind: "dom",
			selector: "[data-cms-editor-link*='cloudcannon:'], a[href*='cloudcannon:']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cloudcannon:header:1",
			kind: "header",
			key: "cc-build-id",
			valuePattern: new RegExp("\\d+", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
