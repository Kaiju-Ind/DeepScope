import type { TechnologyDefinition } from '../../types';

export const sheetyTechnologyDefinition = {
	id: "sheety",
	name: "Sheety",
	website: "https://sheety.co/",
	description: "Sheety is a service that transforms your Google Sheet into an API, enabling easy access to your data for integration with other applications.",
	icon: "Sheety.svg",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "sheety:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sheety\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
