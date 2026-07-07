import type { TechnologyDefinition } from '../../types';

export const breakdanceTechnologyDefinition = {
	id: "breakdance",
	name: "Breakdance",
	website: "https://breakdance.com",
	description: "Breakdance is a page builder that features a drag-and-drop interface for users to create pages using full site editing functionality.",
	icon: "Breakdance.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "breakdance:jsGlobal:0",
			kind: "jsGlobal",
			property: "BreakdanceFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "breakdance:jsGlobal:1",
			kind: "jsGlobal",
			property: "BreakdanceHeaderBuilder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "breakdance:jsGlobal:2",
			kind: "jsGlobal",
			property: "BreakdanceSwiper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
