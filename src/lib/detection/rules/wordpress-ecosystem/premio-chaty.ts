import type { TechnologyDefinition } from '../../types';

export const premioChatyTechnologyDefinition = {
	id: "premio-chaty",
	name: "Premio Chaty",
	website: "https://premio.io/downloads/chaty",
	description: "Chat with your website visitors via their favorite channels with Chaty by Premio.",
	icon: "Premio.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "premio-chaty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/chaty\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "premio-chaty:jsGlobal:1",
			kind: "jsGlobal",
			property: "chaty_settings.chaty_widgets",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "premio-chaty:jsGlobal:2",
			kind: "jsGlobal",
			property: "chaty_settings.object_settings",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
