import type { TechnologyDefinition } from '../../types';

export const reshopTechnologyDefinition = {
	id: "reshop",
	name: "Reshop",
	website: "https://www.reshop.com",
	description: "Reshop is a returns platform that integrates with Shopify to streamline and manage product return processes.",
	icon: "Reshop.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "reshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:https?:)?\\/\\/[^\"']*\\/widgets\\/reshop-tooltip(?:\\.min)?\\.js(?:\\?[^\"']*)?"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
