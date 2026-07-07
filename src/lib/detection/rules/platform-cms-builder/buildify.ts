import type { TechnologyDefinition } from '../../types';

export const buildifyTechnologyDefinition = {
	id: "buildify",
	name: "Buildify",
	website: "https://buildify.shop",
	description: "Buildify is a drag-and-drop page builder system that enables users to visually create and arrange web page layouts without requiring coding knowledge.",
	icon: "Buildify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "buildify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/Aheadworks_Buildify\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buildify:jsGlobal:1",
			kind: "jsGlobal",
			property: "buildifyFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "buildify:jsGlobal:2",
			kind: "jsGlobal",
			property: "buildifyFrontendConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
