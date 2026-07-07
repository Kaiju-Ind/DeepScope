import type { TechnologyDefinition } from '../../types';

export const shopifyConsentManagementTechnologyDefinition = {
	id: "shopify-consent-management",
	name: "Shopify Consent Management",
	website: "https://apps.shopify.com/customer-privacy-banner",
	description: "Shopify Consent Management let's you create a tracking consent banner for EU customers.",
	icon: "Shopify.svg",
	categories: [
		"privacy-compliance",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shopify-consent-management:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cookie_consent_shopify\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
