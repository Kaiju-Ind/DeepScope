import type { TechnologyDefinition } from '../../types';

export const ekonsilioTechnologyDefinition = {
	id: "ekonsilio",
	name: "eKonsilio",
	website: "https://www.ekonsilio.com",
	description: "eKonsilio is a conversational management platform that enables organizations to design, deploy, and manage automated and human-assisted conversations across digital communication channels.",
	icon: "eKonsilio.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ekonsilio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.ekonsilio\\.com"),
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
