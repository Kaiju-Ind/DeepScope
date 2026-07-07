import type { TechnologyDefinition } from '../../types';

export const bevyTechnologyDefinition = {
	id: "bevy",
	name: "Bevy",
	website: "https://bevy.com",
	description: "Bevy is a platform designed to elevate communities by transforming engagement into measurable enterprise return on investment (ROI).",
	icon: "Bevy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bevy:jsGlobal:0",
			kind: "jsGlobal",
			property: "_BEVY_LANGUAGE_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bevy:jsGlobal:1",
			kind: "jsGlobal",
			property: "_BEVY_SETTINGS_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bevy:jsGlobal:2",
			kind: "jsGlobal",
			property: "_BEVY_STYLES_",
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
