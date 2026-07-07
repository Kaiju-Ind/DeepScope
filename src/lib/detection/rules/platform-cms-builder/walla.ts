import type { TechnologyDefinition } from '../../types';

export const wallaTechnologyDefinition = {
	id: "walla",
	name: "Walla",
	website: "https://www.hellowalla.com",
	description: "Walla is a cloud-based fitness studio management software.",
	icon: "Walla.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "walla:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hellowalla\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "walla:jsGlobal:1",
			kind: "jsGlobal",
			property: "wallaWidgetLoader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
