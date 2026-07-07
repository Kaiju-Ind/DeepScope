import type { TechnologyDefinition } from '../../types';

export const robofyTechnologyDefinition = {
	id: "robofy",
	name: "Robofy",
	website: "https://www.robofy.ai",
	description: "Robofy is a platform providing AI chatbots for websites, enabling the creation of custom ChatGPT models trained on user-specific content.",
	icon: "Robofy.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "robofy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.robofy\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
