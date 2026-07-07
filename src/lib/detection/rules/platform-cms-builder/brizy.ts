import type { TechnologyDefinition } from '../../types';

export const brizyTechnologyDefinition = {
	id: "brizy",
	name: "Brizy",
	website: "https://www.brizy.io",
	description: "Brizy is a visual website builder that allows users to create and design websites using drag-and-drop functionality without the need for coding skills.",
	icon: "Brizy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brizy:jsGlobal:0",
			kind: "jsGlobal",
			property: "BrizyLibs.Flatpickr",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brizy:jsGlobal:1",
			kind: "jsGlobal",
			property: "BrizyProLibs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brizy:jsGlobal:2",
			kind: "jsGlobal",
			property: "Brz.emit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
