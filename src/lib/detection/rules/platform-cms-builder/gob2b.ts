import type { TechnologyDefinition } from '../../types';

export const gob2bTechnologyDefinition = {
	id: "gob2b",
	name: "GOb2b",
	website: "https://gob2b.com",
	description: "Gob2b is an ecommerce integration solution that connects an online store to a Sage ERP back-end system for streamlined data flow.",
	icon: "GOb2b.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gob2b:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gob2b\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
