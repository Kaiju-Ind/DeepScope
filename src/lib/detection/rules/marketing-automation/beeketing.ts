import type { TechnologyDefinition } from '../../types';

export const beeketingTechnologyDefinition = {
	id: "beeketing",
	name: "Beeketing",
	website: "https://beeketing.com",
	description: "Beeketing is a suite of marketing apps for ecommerce shop owners.",
	icon: "Beeketing.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "beeketing:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.beeketing\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beeketing:jsGlobal:1",
			kind: "jsGlobal",
			property: "beeketingAnalyticsParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beeketing:jsGlobal:2",
			kind: "jsGlobal",
			property: "beeketingSDKLoaded",
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
