import type { TechnologyDefinition } from '../../types';

export const bannoBankingTechnologyDefinition = {
	id: "banno-banking",
	name: "Banno Banking",
	website: "https://banno.com/digital-banking",
	description: "Banno Banking is a digital banking platform designed to deliver a branded, user-friendly experience by leveraging advanced fintech tools.",
	icon: "Banno.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "banno-banking:jsGlobal:0",
			kind: "jsGlobal",
			property: "banno.site",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "banno-banking:jsGlobal:1",
			kind: "jsGlobal",
			property: "com.banno",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
