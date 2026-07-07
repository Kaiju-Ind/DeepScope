import type { TechnologyDefinition } from '../../types';

export const chaportTechnologyDefinition = {
	id: "chaport",
	name: "Chaport",
	website: "https://www.chaport.com",
	description: "Chaport is a multi-channel live chat and chatbot software for business.",
	icon: "Chaport.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chaport:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chaport\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chaport:jsGlobal:1",
			kind: "jsGlobal",
			property: "chaport",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chaport:jsGlobal:2",
			kind: "jsGlobal",
			property: "chaportConfig",
			description: "Page-owned global matches a known technology marker.",
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
