import type { TechnologyDefinition } from '../../types';

export const blipTechnologyDefinition = {
	id: "blip",
	name: "Blip",
	website: "https://www.blip.ai",
	description: "Blip is an intelligent conversation platform designed to facilitate interactive communication.",
	icon: "Blip.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "blip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/santander-partner-blipchat\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
