import type { TechnologyDefinition } from '../../types';

export const straivTechnologyDefinition = {
	id: "straiv",
	name: "Straiv",
	website: "https://straiv.io",
	description: "Straiv is a hotel software platform that digitalizes the guest journey, offering features such as check-in, guest directory, registration forms, messaging, and more.",
	icon: "Straiv.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "straiv:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.straiv\\.io"),
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
