import type { TechnologyDefinition } from '../../types';

export const vendaeciaTechnologyDefinition = {
	id: "vendaecia",
	name: "Vendaecia",
	website: "https://www.vendaecia.com.br",
	description: "Vendaecia is a platform designed for setting up online stores or selling products through various marketplaces, providing tools to manage the entire sales process.",
	icon: "Vendaecia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vendaecia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vendaecia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vendaecia:dom:1",
			kind: "dom",
			selector: "base[href*='.vendaeciaexpress.com.br']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
