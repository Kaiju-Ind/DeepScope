import type { TechnologyDefinition } from '../../types';

export const googleAdsConversionTrackingTechnologyDefinition = {
	id: "google-ads-conversion-tracking",
	name: "Google Ads Conversion Tracking",
	website: "https://support.google.com/google-ads/answer/1722022",
	description: "Google Ads Conversion Tracking records conversion events from Google Ads campaigns.",
	icon: "Google.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "google-ads-conversion-tracking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googleadservices\\.com/pagead/conversion_async\\.js", "i"),
			confidence: 100,
			description: "Google Ads conversion script is declared.",
		},
		{
			id: "google-ads-conversion-tracking:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("(?:googleads\\.g\\.doubleclick\\.net/pagead/|google\\.com/pagead/|googleadservices\\.com/pagead/)", "i"),
			confidence: 100,
			description: "Google Ads conversion/pagead request was observed.",
		},
		{
			id: "google-ads-conversion-tracking:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]*[\"\\']AW-([0-9]+)", "i"),
			version: {
				source: "match",
				template: "AW-$1",
			},
			confidence: 65,
			description: "Inline script config references a Google Ads conversion id.",
		},
	],
	implies: [
		"google-ads",
	],
	metadata: {
		saas: true,
		pricing: ["freemium"],
	},
} as const satisfies TechnologyDefinition;
