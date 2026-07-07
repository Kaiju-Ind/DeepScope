import type { TechnologyDefinition } from '../../types';

export const zipchatTechnologyDefinition = {
	id: "zipchat",
	name: "Zipchat",
	website: "https://zipchat.ai",
	description: "Zipchat is an AI chatbot for ecommerce, designed to boost sales by automating customer interactions and assisting with purchasing decisions.",
	icon: "Zipchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zipchat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.zipchat\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "zipchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "zipchatWidgetLoaded",
			description: "Page-owned global matches a known technology marker.",
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
