import type { TechnologyDefinition } from '../../types';

export const gdprCookieConsentPluginByWebtoffeeTechnologyDefinition = {
	id: "gdpr-cookie-consent-plugin-by-webtoffee",
	name: "GDPR Cookie Consent Plugin by Webtoffee",
	website: "https://www.webtoffee.com/product/gdpr-cookie-consent/",
	description: "GDPR Cookie Consent Plugin by Webtoffee is a WordPress solution that ensures GDPR and CCPA compliance, supports IAB standards, and integrates with Google Consent Mode.",
	icon: "GDPRCookieConsent.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "gdpr-cookie-consent-plugin-by-webtoffee:jsGlobal:0",
			kind: "jsGlobal",
			property: "webtoffee._wccConsentStore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gdpr-cookie-consent-plugin-by-webtoffee:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^wt_consent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
