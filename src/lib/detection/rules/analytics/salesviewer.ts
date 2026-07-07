import type { TechnologyDefinition } from '../../types';

export const salesviewerTechnologyDefinition = {
	id: "salesviewer",
	name: "SalesViewer",
	website: "https://www.salesviewer.com",
	description: "SalesViewer is a tool that identifies anonymous website visitors.",
	icon: "SalesViewer.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "salesviewer:jsGlobal:0",
			kind: "jsGlobal",
			property: "SV_JSON",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesviewer:jsGlobal:1",
			kind: "jsGlobal",
			property: "SV_XHR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesviewer:jsGlobal:2",
			kind: "jsGlobal",
			property: "SV_XHR_0",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
