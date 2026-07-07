import type { TechnologyDefinition } from '../../types';

export const venyooTechnologyDefinition = {
	id: "venyoo",
	name: "Venyoo",
	website: "https://venew.io",
	description: "Venyoo is a live and robot chat widget designed to facilitate communication.",
	icon: "Venyoo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "venyoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.venyoo\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "venyoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "venyooProxyScript",
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
