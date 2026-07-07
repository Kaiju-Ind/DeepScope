import type { TechnologyDefinition } from '../../types';

export const chattTechnologyDefinition = {
	id: "chatt",
	name: "Chatt",
	website: "https://getchatt.com",
	description: "Chatt is an all-in-one platform that provides businesses with reviews, messaging, and payment solutions.",
	icon: "Chatt.svg",
	categories: [
		"commerce-operations",
		"email-messaging",
		"community-ugc",
	],
	rules: [
		{
			id: "chatt:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("getchatt\\.com"),
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
