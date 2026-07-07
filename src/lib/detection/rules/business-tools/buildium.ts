import type { TechnologyDefinition } from '../../types';

export const buildiumTechnologyDefinition = {
	id: "buildium",
	name: "Buildium",
	website: "https://www.buildium.com",
	description: "Buildium is a property management system that supports leasing, accounting, maintenance tracking, and communication for residential and association property portfolios.",
	icon: "Buildium.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "buildium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("info\\.buildium\\.com"),
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
