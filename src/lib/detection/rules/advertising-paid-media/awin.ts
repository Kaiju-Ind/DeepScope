import type { TechnologyDefinition } from '../../types';

export const awinTechnologyDefinition = {
	id: "awin",
	name: "AWIN",
	website: "https://www.awin.com",
	description: "AWIN is a global affiliate marketing network.",
	icon: "AWIN.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "awin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dwin1\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "awin:jsGlobal:1",
			kind: "jsGlobal",
			property: "AWIN.Tracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "awin:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^BAGawin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "awin:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_aw_xid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "awin:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("zanox\\.com\\/scripts\\/zanox\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "awin:dom:5",
			kind: "dom",
			selector: "img[src*='add.zanox.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "awin:jsGlobal:6",
			kind: "jsGlobal",
			property: "zanox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "awin:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^bagawin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
