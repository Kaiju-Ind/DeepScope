import type { TechnologyDefinition } from '../../types';

export const boxmodeTechnologyDefinition = {
	id: "boxmode",
	name: "Boxmode",
	website: "https://www.boxmode.com",
	description: "Boxmode is a drag-and-drop website builder designed for creating websites across various niches.",
	icon: "Boxmode.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "boxmode:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("storage\\.boxmode\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boxmode:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOXMODE_PROJECT_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boxmode:jsGlobal:2",
			kind: "jsGlobal",
			property: "_BoxmodeConfig",
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
