import type { TechnologyDefinition } from '../../types';

export const googleAdsenseTechnologyDefinition = {
	id: "google-adsense",
	name: "Google AdSense",
	website: "https://www.google.com/adsense/start/",
	description: "Google AdSense is a program run by Google through which website publishers serve advertisements that are targeted to the site content and audience.",
	icon: "Google AdSense.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "google-adsense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googlesyndication\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-adsense:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("ad\\.ca\\.doubleclick\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-adsense:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("2mdn\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-adsense:jsGlobal:3",
			kind: "jsGlobal",
			property: "Goog_AdSense_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-adsense:jsGlobal:4",
			kind: "jsGlobal",
			property: "Goog_AdSense_OsdAdapter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-adsense:jsGlobal:5",
			kind: "jsGlobal",
			property: "__google_ad_urls",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-adsense:jsGlobal:6",
			kind: "jsGlobal",
			property: "adsbygoogle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-adsense:jsGlobal:7",
			kind: "jsGlobal",
			property: "google_ad_",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-adsense:dom:8",
			kind: "dom",
			selector: "amp-ad[type='adsense']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
