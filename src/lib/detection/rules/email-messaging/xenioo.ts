import type { TechnologyDefinition } from '../../types';

export const xeniooTechnologyDefinition = {
	id: "xenioo",
	name: "Xenioo",
	website: "https://www.xenioo.com",
	description: "Xenioo is an omnichannel chatbot platform designed to create, manage, and deploy conversational agents across multiple messaging channels.",
	icon: "Xenioo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "xenioo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.xenioo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xenioo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Xenioo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
