import type { TechnologyDefinition } from '../../types';

export const landingiTechnologyDefinition = {
	id: "landingi",
	name: "Landingi",
	website: "https://landingi.com",
	description: "Landingi is a platform for automating the creation, management, and optimization of landing pages.",
	icon: "Landingi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "landingi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.assets-landingi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "landingi:jsGlobal:1",
			kind: "jsGlobal",
			property: "landingiInternalDetails",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
