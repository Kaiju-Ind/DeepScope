import type { TechnologyDefinition } from '../../types';

export const yotpoSubscriptionsTechnologyDefinition = {
	id: "yotpo-subscriptions",
	name: "Yotpo Subscriptions",
	website: "https://www.yotpo.com/platform/subscriptions/",
	description: "Yotpo Subscriptions is a Shopify app designed for merchants to provide subscription services to customers.",
	icon: "Yotpo.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "yotpo-subscriptions:html:0",
			kind: "html",
			pattern: new RegExp("<!-- BEGIN app block: shopify:\\/\\/apps\\/yotpo-subscriptions\\/blocks\\/app-embed-block"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yotpo-subscriptions:html:1",
			kind: "html",
			pattern: new RegExp("<!-- begin app block: shopify:\\/\\/apps\\/yotpo-subscriptions\\/blocks\\/app-embed-block"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
