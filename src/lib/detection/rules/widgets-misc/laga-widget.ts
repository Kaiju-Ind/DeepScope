import type { TechnologyDefinition } from '../../types';

export const lagaWidgetTechnologyDefinition = {
	id: "laga-widget",
	name: "Laga Widget",
	website: "https://laga.se",
	description: "Laga Widget is a tool for car dismantlers to search and manage parts within their inventory.",
	icon: "LagaWidget.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "laga-widget:jsGlobal:0",
			kind: "jsGlobal",
			property: "laga-widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "laga-widget:jsGlobal:1",
			kind: "jsGlobal",
			property: "lagaWidgetOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
