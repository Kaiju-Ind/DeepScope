import type { TechnologyDefinition } from '../../types';

export const dinaKunderTechnologyDefinition = {
	id: "dina-kunder",
	name: "Dina Kunder",
	website: "https://dinakunder.se",
	description: "Dina Kunder is a provider of AI chatbots designed for automating customer support.",
	icon: "DinaKunder.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "dina-kunder:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.dinakunder\\.se"),
			description: "Script content contains a bounded technology signature.",
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
