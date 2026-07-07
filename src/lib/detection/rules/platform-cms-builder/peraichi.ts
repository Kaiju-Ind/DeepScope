import type { TechnologyDefinition } from '../../types';

export const peraichiTechnologyDefinition = {
	id: "peraichi",
	name: "Peraichi",
	website: "https://peraichi.com",
	description: "Peraichi is a software company that develops website creation tools and user support systems necessary for businesses.",
	icon: "Peraichi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "peraichi:jsGlobal:0",
			kind: "jsGlobal",
			property: "Peraichi",
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
