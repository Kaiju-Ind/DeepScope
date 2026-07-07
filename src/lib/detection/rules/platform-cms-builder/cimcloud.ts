import type { TechnologyDefinition } from '../../types';

export const cimcloudTechnologyDefinition = {
	id: "cimcloud",
	name: "CIMcloud",
	website: "https://www.cimcloud.com",
	description: "CIMcloud is a customer interaction management platform that integrates ecommerce capabilities.",
	icon: "CIMcloud.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cimcloud:jsGlobal:0",
			kind: "jsGlobal",
			property: "cimcloud.catalog",
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
