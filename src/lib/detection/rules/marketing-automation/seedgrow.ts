import type { TechnologyDefinition } from '../../types';

export const seedgrowTechnologyDefinition = {
	id: "seedgrow",
	name: "SeedGrow",
	website: "https://seedgrow.net",
	description: "SeedGrow is a marketing solutions provider for Shopify, offering tools and services to support customer acquisition, engagement, and sales optimization for online stores.",
	icon: "SeedGrow.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seedgrow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.seedgrow\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seedgrow:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.seedgrow\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "seedgrow:jsGlobal:2",
			kind: "jsGlobal",
			property: "seedgrow_whatsapp_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seedgrow:jsGlobal:3",
			kind: "jsGlobal",
			property: "seedgrow_widget_setting",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
