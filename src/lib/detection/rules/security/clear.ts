import type { TechnologyDefinition } from '../../types';

export const clearTechnologyDefinition = {
	id: "clear",
	name: "Clear",
	website: "https://www.clearme.com",
	description: "Clear is a platform that offers secure identity verification.",
	icon: "Clear.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "clear:jsGlobal:0",
			kind: "jsGlobal",
			property: "ClearMe.Environments",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clear:jsGlobal:1",
			kind: "jsGlobal",
			property: "clearMeClientID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
