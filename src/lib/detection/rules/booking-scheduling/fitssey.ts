import type { TechnologyDefinition } from '../../types';

export const fitsseyTechnologyDefinition = {
	id: "fitssey",
	name: "Fitssey",
	website: "https://fitssey.com",
	description: "Fitssey is a booking software designed to manage studio appointments and scheduling.",
	icon: "Fitssey.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fitssey:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.fitssey\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fitssey:jsGlobal:1",
			kind: "jsGlobal",
			property: "FitsseyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
