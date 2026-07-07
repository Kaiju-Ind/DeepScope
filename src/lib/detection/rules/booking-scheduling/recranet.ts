import type { TechnologyDefinition } from '../../types';

export const recranetTechnologyDefinition = {
	id: "recranet",
	name: "Recranet",
	website: "https://recranet.com",
	description: "Recranet is a software solution for booking and sales, providing businesses with tools to manage trips and activities in an organized and centralized system.",
	icon: "Recranet.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "recranet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.recranet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recranet:jsGlobal:1",
			kind: "jsGlobal",
			property: "recranetConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
