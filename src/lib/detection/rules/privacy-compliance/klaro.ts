import type { TechnologyDefinition } from '../../types';

export const klaroTechnologyDefinition = {
	id: "klaro",
	name: "Klaro",
	website: "https://heyklaro.com",
	description: "Klaro is a simple consent management platform and privacy tool.",
	icon: "Klaro.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "klaro:jsGlobal:0",
			kind: "jsGlobal",
			property: "klaro",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klaro:jsGlobal:1",
			kind: "jsGlobal",
			property: "klaroConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
