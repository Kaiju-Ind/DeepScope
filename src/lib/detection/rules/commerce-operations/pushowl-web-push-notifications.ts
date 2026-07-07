import type { TechnologyDefinition } from '../../types';

export const pushowlWebPushNotificationsTechnologyDefinition = {
	id: "pushowl-web-push-notifications",
	name: "PushOwl Web Push Notifications",
	website: "https://apps.shopify.com/pushowl",
	description: "PushOwl Web Push Notifications are a Shopify app which helps recover abandoned carts and market better with web push.",
	icon: "PushOwl.svg",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "pushowl-web-push-notifications:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sdks\\/pushowl-shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"pushowl",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
