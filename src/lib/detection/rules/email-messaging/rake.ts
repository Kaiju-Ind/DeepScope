import type { TechnologyDefinition } from '../../types';

export const rakeTechnologyDefinition = {
	id: "rake",
	name: "Rake",
	website: "https://www.rake.ai",
	description: "Rake is a messaging platform and conversion optimization solution designed for communication between customers, visitors, and co-workers.",
	icon: "Rake.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "rake:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.rake\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
