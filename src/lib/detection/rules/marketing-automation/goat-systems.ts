import type { TechnologyDefinition } from '../../types';

export const goatSystemsTechnologyDefinition = {
	id: "goat-systems",
	name: "Goat Systems",
	website: "https://www.thegoatsystems.com",
	description: "Goat Systems is a provider of marketing automation and CRM software designed to support business growth.",
	icon: "GoatSystems.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "goat-systems:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.thegoatsystems\\.com"),
			description: "Script content contains a bounded technology signature.",
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
