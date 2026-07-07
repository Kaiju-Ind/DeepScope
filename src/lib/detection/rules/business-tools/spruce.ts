import type { TechnologyDefinition } from '../../types';

export const spruceTechnologyDefinition = {
	id: "spruce",
	name: "Spruce",
	website: "https://sprucehealth.com",
	description: "Spruce is a digital healthcare platform that provides virtual medical services and tools for managing patient care.",
	icon: "Spruce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "spruce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget-api\\.sprucehealth\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spruce:jsGlobal:1",
			kind: "jsGlobal",
			property: "__SPRUCE_WIDGET_CONFIG__",
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
