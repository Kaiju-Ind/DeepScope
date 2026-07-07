import type { TechnologyDefinition } from '../../types';

export const sailthruTechnologyDefinition = {
	id: "sailthru",
	name: "Sailthru",
	website: "https://www.sailthru.com",
	description: "Sailthru is a marketing automation software and multi-channel personalisation tool that serves ecommerce and media brands.",
	icon: "Sailthru.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sailthru:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ak\\.sail-horizon\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sailthru:dom:1",
			kind: "dom",
			selector: "link[href*='ak.sail-horizon.com'],link[href*='api.sail-personalize.com'],link[href*='api.sail-track.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sailthru:jsGlobal:2",
			kind: "jsGlobal",
			property: "Sailthru",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sailthru:jsGlobal:3",
			kind: "jsGlobal",
			property: "sailthruIdentify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sailthru:jsGlobal:4",
			kind: "jsGlobal",
			property: "sailthruNewsletterRegistration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sailthru:jsGlobal:5",
			kind: "jsGlobal",
			property: "trackSailthruUser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sailthru:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^sailthru_pageviews$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
