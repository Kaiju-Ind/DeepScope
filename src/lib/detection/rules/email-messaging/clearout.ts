import type { TechnologyDefinition } from '../../types';

export const clearoutTechnologyDefinition = {
	id: "clearout",
	name: "Clearout",
	website: "https://clearout.io",
	description: "Clearout is a bulk email validation service designed to clean email lists and improve deliverability.",
	icon: "Clearout.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "clearout:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.clearout\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clearout:jsGlobal:1",
			kind: "jsGlobal",
			property: "clearout.$",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
