import type { TechnologyDefinition } from '../../types';

export const devrevTechnologyDefinition = {
	id: "devrev",
	name: "DevRev",
	website: "https://devrev.ai/plug-observability",
	description: "DevRev PLuG is a customer support platform offering live chat, help documentation, search functionality, an observability engine, and product announcements, all integrated within a widget similar to a support chat widget for website assistance.",
	icon: "DevRev.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "devrev:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("plug-platform\\.devrev\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
