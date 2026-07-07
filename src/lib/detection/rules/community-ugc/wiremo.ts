import type { TechnologyDefinition } from '../../types';

export const wiremoTechnologyDefinition = {
	id: "wiremo",
	name: "Wiremo",
	website: "https://wiremo.co",
	description: "Wiremo is a customer review platform designed for eCommerce businesses to collect, manage, and display user-generated feedback.",
	icon: "Wiremo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "wiremo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wapi\\.wiremo\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wiremo:jsGlobal:1",
			kind: "jsGlobal",
			property: "pluginWiremoIntegration",
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
