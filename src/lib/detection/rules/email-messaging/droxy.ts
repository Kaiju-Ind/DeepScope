import type { TechnologyDefinition } from '../../types';

export const droxyTechnologyDefinition = {
	id: "droxy",
	name: "Droxy",
	website: "https://www.droxy.ai",
	description: "Droxy is a tool that transforms content into interactive AI chatbots for educational and business use, enabling more engaging knowledge sharing.",
	icon: "Droxy.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "droxy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.droxy\\.ai\\/chat"),
			description: "Script source URL matches a known technology marker.",
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
