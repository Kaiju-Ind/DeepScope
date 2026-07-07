import type { TechnologyDefinition } from '../../types';

export const quantTechnologyDefinition = {
	id: "quant",
	name: "Quant",
	website: "https://pf.quant.page",
	description: "Quant is a Japanese content and creator management system designed to organize, manage, and distribute digital content.",
	icon: "Quant.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quant\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
