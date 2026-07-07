import type { TechnologyDefinition } from '../../types';

export const googleAdsConversionTrackingTechnologyDefinition = {
	id: "google-ads-conversion-tracking",
	name: "Google Ads Conversion Tracking",
	website: "https://support.google.com/google-ads/answer/1722022",
	description: "Google Ads Conversion Tracking is a free tool that shows you what happens after a customer interacts with your ads.",
	icon: "Google.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "google-ads-conversion-tracking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.googleadservices\\.com\\/pagead\\/conversion_async\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-ads-conversion-tracking:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(AW-)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "google-ads-conversion-tracking:jsGlobal:2",
			kind: "jsGlobal",
			property: "google_trackConversion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-ads-conversion-tracking:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("gtag\\([^)]+'(aw-)"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"google-ads",
	],
} as const satisfies TechnologyDefinition;
