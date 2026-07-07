import type { TechnologyDefinition } from '../../types';

export const shopcadaTechnologyDefinition = {
	id: "shopcada",
	name: "Shopcada",
	website: "https://shopcada.com",
	icon: "Shopcada.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopcada:jsGlobal:0",
			kind: "jsGlobal",
			property: "Shopcada",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
