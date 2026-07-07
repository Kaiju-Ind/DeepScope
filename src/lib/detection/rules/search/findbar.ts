import type { TechnologyDefinition } from '../../types';

export const findbarTechnologyDefinition = {
	id: "findbar",
	name: "Findbar",
	website: "https://findbar.io",
	description: "Findbar specializes in advanced on-site search technology, enhancing user engagement and improving the overall user experience on websites and applications.",
	icon: "Findbar.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "findbar:jsGlobal:0",
			kind: "jsGlobal",
			property: "Findbar",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "findbar:jsGlobal:1",
			kind: "jsGlobal",
			property: "findbarScriptLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
