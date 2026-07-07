import type { TechnologyDefinition } from '../../types';

export const progredaTechnologyDefinition = {
	id: "progreda",
	name: "Progreda",
	website: "https://progreda.com",
	description: "Progreda is a platform that automates sales conversations via text, Instagram, and Facebook Messenger to generate leads, schedule appointments, and drive revenue growth.",
	icon: "Progreda.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "progreda:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.progreda\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
