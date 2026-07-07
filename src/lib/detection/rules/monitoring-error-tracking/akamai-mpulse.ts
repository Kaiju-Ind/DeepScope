import type { TechnologyDefinition } from '../../types';

export const akamaiMpulseTechnologyDefinition = {
	id: "akamai-mpulse",
	name: "Akamai mPulse",
	website: "https://developer.akamai.com/akamai-mpulse-real-user-monitoring-solution",
	description: "Akamai mPulse is a real user monitoring (RUM) solution that enables companies to monitor, find, and fix website and application performance issues.",
	icon: "Akamai.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "akamai-mpulse:html:0",
			kind: "html",
			pattern: new RegExp("<script>[\\s\\S]*?go-mpulse\\.net\\/boomerang[\\s\\S]*?<\\/script>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "akamai-mpulse:jsGlobal:1",
			kind: "jsGlobal",
			property: "BOOMR_API_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "akamai-mpulse:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^akaas_AB\\-Testing$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "akamai-mpulse:dom:3",
			kind: "dom",
			selector: "script#boomr-if-as, script#boomr-scr-as, link[href*='s.go-mpulse.net/boomerang/'][rel='preload']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "akamai-mpulse:html:4",
			kind: "html",
			pattern: new RegExp("<script>[\\s\\s]*?go-mpulse\\.net\\/boomerang[\\s\\s]*?<\\/script>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "akamai-mpulse:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^akaas_ab\\-testing$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"boomerang",
	],
} as const satisfies TechnologyDefinition;
