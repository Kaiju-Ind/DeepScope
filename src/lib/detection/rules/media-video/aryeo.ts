import type { TechnologyDefinition } from '../../types';

export const aryeoTechnologyDefinition = {
	id: "aryeo",
	name: "Aryeo",
	website: "https://www.aryeo.com",
	description: "Aryeo is an all-in-one platform designed to manage, deliver, and organize media for real estate photographers.",
	icon: "Aryeo.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "aryeo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.aryeo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "aryeo:jsGlobal:1",
			kind: "jsGlobal",
			property: "ARYEO_COMPANY_API_V1_BASE_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aryeo:jsGlobal:2",
			kind: "jsGlobal",
			property: "ARYEO_ENVIRONMENT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
