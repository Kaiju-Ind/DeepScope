import type { TechnologyDefinition } from '../../types';

export const syncfusionTechnologyDefinition = {
	id: "syncfusion",
	name: "Syncfusion",
	website: "https://www.syncfusion.com",
	description: "Syncfusion is a JavaScript UI controls library that includes a wide range of UI components in a single package.",
	icon: "Syncfusion.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "syncfusion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.syncfusion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "syncfusion:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.syncfusion.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "syncfusion:jsGlobal:2",
			kind: "jsGlobal",
			property: "Syncfusion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
