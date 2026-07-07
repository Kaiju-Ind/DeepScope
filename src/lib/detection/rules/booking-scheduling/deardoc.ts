import type { TechnologyDefinition } from '../../types';

export const deardocTechnologyDefinition = {
	id: "deardoc",
	name: "DearDoc",
	website: "https://www.getdeardoc.com",
	description: "DearDoc is an appointment scheduling system that organizes, manages, and tracks appointments to streamline booking processes.",
	icon: "DearDoc.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "deardoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ai\\.getdeardoc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
