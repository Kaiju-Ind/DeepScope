import type { TechnologyDefinition } from '../../types';

export const googleAnalyticsEnhancedEcommerceTechnologyDefinition = {
	id: "google-analytics-enhanced-ecommerce",
	name: "Google Analytics Enhanced eCommerce",
	website: "https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce",
	description: "Google analytics enhanced ecommerce is a plug-in which enables the measurement of user interactions with products on ecommerce websites.",
	icon: "Google Analytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "google-analytics-enhanced-ecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("google-analytics\\.com\\/plugins\\/ua\\/(?:ec|ecommerce)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-analytics-enhanced-ecommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "gaplugins.EC",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"cart-functionality",
		"google-analytics",
	],
} as const satisfies TechnologyDefinition;
