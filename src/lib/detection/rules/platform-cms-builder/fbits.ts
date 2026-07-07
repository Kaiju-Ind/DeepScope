import type { TechnologyDefinition } from '../../types';

export const fbitsTechnologyDefinition = {
	id: "fbits",
	name: "Fbits",
	website: "https://www.traycorp.com.br",
	icon: "Fbits.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fbits:jsGlobal:0",
			kind: "jsGlobal",
			property: "fbits",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
