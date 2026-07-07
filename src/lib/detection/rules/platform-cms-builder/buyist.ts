import type { TechnologyDefinition } from '../../types';

export const buyistTechnologyDefinition = {
	id: "buyist",
	name: "Buyist",
	website: "https://buyist.com",
	description: "Buyist is a code-less ecommerce platform designed for performance marketers.",
	icon: "Buyist.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "buyist:jsGlobal:0",
			kind: "jsGlobal",
			property: "buyistApp.buttonService",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "buyist:jsGlobal:1",
			kind: "jsGlobal",
			property: "buyistAppData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
