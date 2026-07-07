import type { TechnologyDefinition } from '../../types';

export const kobimasterTechnologyDefinition = {
	id: "kobimaster",
	name: "KobiMaster",
	website: "https://www.kobimaster.com.tr",
	description: "KobiMaster is an ecommerce platform from Turkey.",
	icon: "Kobimaster.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kobimaster:jsGlobal:0",
			kind: "jsGlobal",
			property: "kmGetSession",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kobimaster:jsGlobal:1",
			kind: "jsGlobal",
			property: "kmPageInfo",
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
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
