import type { TechnologyDefinition } from '../../types';

export const plaitTechnologyDefinition = {
	id: "plait",
	name: "Plait",
	website: "http://plaithealth.com",
	description: "Plait is a productivity software for health practices that supports team collaboration with patients to enhance efficiency and drive business growth.",
	icon: "Plait.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "plait:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.plaithealth\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "plait:jsGlobal:1",
			kind: "jsGlobal",
			property: "$plait",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plait:jsGlobal:2",
			kind: "jsGlobal",
			property: "plaitSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plait:jsGlobal:3",
			kind: "jsGlobal",
			property: "plaitSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
