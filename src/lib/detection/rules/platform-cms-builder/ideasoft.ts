import type { TechnologyDefinition } from '../../types';

export const ideasoftTechnologyDefinition = {
	id: "ideasoft",
	name: "Ideasoft",
	website: "https://www.ideasoft.com.tr",
	description: "Ideasoft is a Turkish software company providing web-based software solutions, software design, ecommerce solutions, and other services.",
	icon: "Ideasoft.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ideasoft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.myideasoft\\.com\\/([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ideasoft:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ideasoft\\.dev\\/"),
			description: "Script source URL matches a known technology marker.",
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
