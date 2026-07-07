import type { TechnologyDefinition } from '../../types';

export const capacityTechnologyDefinition = {
	id: "capacity",
	name: "Capacity",
	website: "https://capacity.com",
	description: "Capacity is a live chat system for ecommerce websites, formerly known as Needle.",
	icon: "Capacity.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "capacity:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.needle\\.com\\/"),
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
