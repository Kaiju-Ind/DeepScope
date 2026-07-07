import type { TechnologyDefinition } from '../../types';

export const baseTechnologyDefinition = {
	id: "base",
	name: "Base",
	website: "https://thebase.in",
	description: "Base is a hosted ecommerce platform that allows business owners to set up an online store and sell their products online.",
	icon: "Base.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "base:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("thebase\\.in\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "base:jsGlobal:1",
			kind: "jsGlobal",
			property: "BASE_API.shop_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "base:jsGlobal:2",
			kind: "jsGlobal",
			property: "Base.App.open_nav",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "base:meta:3",
			kind: "meta",
			key: "base-theme-version",
			valuePattern: new RegExp("\\d+", "i"),
			confidence: 50,
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "base:dom:4",
			kind: "dom",
			selector: "link[href*='.thebase.in/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
