import type { TechnologyDefinition } from '../../types';

export const sendloopTechnologyDefinition = {
	id: "sendloop",
	name: "Sendloop",
	website: "https://sendloop.com",
	description: "Sendloop is a platform that offers custom-built email marketing solutions designed to meet specific business needs.",
	icon: "Sendloop.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sendloop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sendloop\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
