import type { TechnologyDefinition } from '../../types';

export const flyzooTechnologyDefinition = {
	id: "flyzoo",
	name: "Flyzoo",
	website: "https://flyzoo.co",
	description: "Flyzoo is a platform that provides real-time chat functionality designed to support online communities.",
	icon: "Flyzoo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "flyzoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.flyzoo\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flyzoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Flyzoo.AT",
			description: "Page-owned global matches a known technology marker.",
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
