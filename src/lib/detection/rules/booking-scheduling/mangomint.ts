import type { TechnologyDefinition } from '../../types';

export const mangomintTechnologyDefinition = {
	id: "mangomint",
	name: "Mangomint",
	website: "https://www.mangomint.com",
	description: "Mangomint is a salon and spa management platform that centralizes scheduling, client records, payments, and operational tools for service-based businesses.",
	icon: "Mangomint.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "mangomint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("booking\\.mangomint\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mangomint:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mangomint.CompanyId",
			description: "Page-owned global matches a known technology marker.",
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
