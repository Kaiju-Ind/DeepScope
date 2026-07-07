import type { TechnologyDefinition } from '../../types';

export const sminkTechnologyDefinition = {
	id: "smink",
	name: "Smink",
	website: "https://smink.ru",
	description: "Smink is a cloud platform for building and managing websites, online stores, and CRM workflows.",
	icon: "Smink.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smink:dom:0",
			kind: "dom",
			selector: "link[rel='manifest'][href*='/smink/published/manifest/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "smink:jsGlobal:1",
			kind: "jsGlobal",
			property: "smink_ajax",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
