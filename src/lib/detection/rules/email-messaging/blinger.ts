import type { TechnologyDefinition } from '../../types';

export const blingerTechnologyDefinition = {
	id: "blinger",
	name: "Blinger",
	website: "https://blinger.io",
	description: "Blinger is an omnichannel customer support and sales platform that aggregates messaging apps and live chat into a single helpdesk interface.",
	icon: "Blinger.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "blinger:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.blinger\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blinger:jsGlobal:1",
			kind: "jsGlobal",
			property: "Blinger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blinger:jsGlobal:2",
			kind: "jsGlobal",
			property: "blingerInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:blinger:blinger:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
