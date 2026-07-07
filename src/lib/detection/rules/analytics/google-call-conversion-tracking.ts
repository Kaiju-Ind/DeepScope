import type { TechnologyDefinition } from '../../types';

export const googleCallConversionTrackingTechnologyDefinition = {
	id: "google-call-conversion-tracking",
	name: "Google Call Conversion Tracking",
	website: "https://support.google.com/google-ads/answer/6100664",
	description: "Google Call Conversion Tracking is conversion tracking that shows which search keywords are driving the most calls.",
	icon: "Google.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "google-call-conversion-tracking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gstatic\\.com\\/call-tracking\\/.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-call-conversion-tracking:jsGlobal:1",
			kind: "jsGlobal",
			property: "_googCallTrackingImpl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "google-call-conversion-tracking:jsGlobal:2",
			kind: "jsGlobal",
			property: "google_wcc_status",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
