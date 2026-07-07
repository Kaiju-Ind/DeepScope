import type { TechnologyDefinition } from '../../types';

export const droipTechnologyDefinition = {
	id: "droip",
	name: "Droip",
	website: "https://droip.com/",
	description: "Droip is a WordPress no-code website builder with a drag-and-drop visual interface for creating responsive websites.",
	icon: "Droip.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "droip:jsGlobal:0",
			kind: "jsGlobal",
			property: "droipViewports",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "droip:jsGlobal:1",
			kind: "jsGlobal",
			property: "showDroipPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "droip:jsGlobal:2",
			kind: "jsGlobal",
			property: "wp_droip",
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
		cpe: "cpe:2.3:a:themeum:droip:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
