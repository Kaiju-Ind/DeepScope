import type { TechnologyDefinition } from '../../types';

export const upsellplusTechnologyDefinition = {
	id: "upsellplus",
	name: "UpsellPlus",
	website: "https://www.upsellplus.com",
	description: "Upsell is an app that provides checkout upsells, post-purchase pages, and customization options to improve sales and customer experience.",
	icon: "UpsellPlus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "upsellplus:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.upsellplus\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "upsellplus:jsGlobal:1",
			kind: "jsGlobal",
			property: "upsellplusapp",
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
