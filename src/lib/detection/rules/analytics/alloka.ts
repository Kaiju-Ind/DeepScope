import type { TechnologyDefinition } from '../../types';

export const allokaTechnologyDefinition = {
	id: "alloka",
	name: "Alloka",
	website: "https://alloka.ru",
	description: "Alloka is a platform that provides end-to-end analytics and dynamic call tracking.",
	icon: "Alloka.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "alloka:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.alloka\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alloka:jsGlobal:1",
			kind: "jsGlobal",
			property: "AllokaId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "alloka:jsGlobal:2",
			kind: "jsGlobal",
			property: "allokaAddEvent",
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
