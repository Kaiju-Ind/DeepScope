import type { TechnologyDefinition } from '../../types';

export const brushdTechnologyDefinition = {
	id: "brushd",
	name: "Brushd",
	website: "https://www.brushd.com",
	description: "Brushd is a portfolio website builder that simplifies the creation and maintenance of online creative portfolios.",
	icon: "Brushd.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brushd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.brushd\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brushd:header:1",
			kind: "header",
			key: "X-Computed-Host",
			valuePattern: new RegExp("content\\.brushd\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "brushd:header:2",
			kind: "header",
			key: "x-computed-host",
			valuePattern: new RegExp("content\\.brushd\\.co", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
