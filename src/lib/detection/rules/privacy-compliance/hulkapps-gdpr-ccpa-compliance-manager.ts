import type { TechnologyDefinition } from '../../types';

export const hulkappsGdprCcpaComplianceManagerTechnologyDefinition = {
	id: "hulkapps-gdpr-ccpa-compliance-manager",
	name: "HulkApps GDPR/CCPA Compliance Manager",
	website: "https://www.hulkapps.com/products/gdpr-ccpa-cookie-manager-shopify-app",
	description: "HulkApps GDPR/CCPA Compliance Manager is a consent management solution.",
	icon: "HulkApps.svg",
	categories: [
		"privacy-compliance",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hulkapps-gdpr-ccpa-compliance-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cookiebar\\.hulkapps\\.com\\/hulk_cookie_bar\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hulkapps-gdpr-ccpa-compliance-manager:jsGlobal:1",
			kind: "jsGlobal",
			property: "hulkSetCookie",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
