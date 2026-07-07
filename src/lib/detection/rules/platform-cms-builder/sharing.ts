import type { TechnologyDefinition } from '../../types';

export const sharingTechnologyDefinition = {
	id: "sharing",
	name: "Sharing",
	website: "https://web.sharing.tw",
	description: "Sharing is a platform for AI-generated websites, offering tools for web creation and site building.",
	icon: "Sharing.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sharing:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sharing$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sharing:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sharing$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
