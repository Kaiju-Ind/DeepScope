import type { TechnologyDefinition } from '../../types';

export const useberryTechnologyDefinition = {
	id: "useberry",
	name: "Useberry",
	website: "https://www.useberry.com",
	description: "Useberry is a platform that provides tools for conducting and analyzing user testing in a single integrated environment.",
	icon: "Useberry.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "useberry:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.useberry\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "useberry:jsGlobal:1",
			kind: "jsGlobal",
			property: "useberryLive",
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
