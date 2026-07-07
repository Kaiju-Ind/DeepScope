import type { TechnologyDefinition } from '../../types';

export const tallentorWidgetTechnologyDefinition = {
	id: "tallentor-widget",
	name: "Tallentor Widget",
	website: "https://tallentor.com",
	description: "Tallentor is a subscription-based software website analytics, heatmap, channel chat intergration.",
	icon: "Tallentor.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tallentor-widget:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^tallentor_widget$", "i"),
			description: "Cookie name matches a known technology marker.",
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
