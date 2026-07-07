import type { TechnologyDefinition } from '../../types';

export const kartmaxTechnologyDefinition = {
	id: "kartmax",
	name: "Kartmax",
	website: "https://kartmax.in",
	description: "Kartmax is a D2C ecommerce business solution designed to support direct-to-consumer operations.",
	icon: "Kartmax.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kartmax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kartmax\\.in\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
