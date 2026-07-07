import type { TechnologyDefinition } from '../../types';

export const axeptioTechnologyDefinition = {
	id: "axeptio",
	name: "Axeptio",
	website: "https://www.axeptio.eu",
	description: "Axeptio is a trusted third party that collects and archive users' consent in a GDPR compliant fashion.",
	icon: "Axeptio.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "axeptio:dom:0",
			kind: "dom",
			selector: "img[src*='axeptio.imgix.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "axeptio:jsGlobal:1",
			kind: "jsGlobal",
			property: "axeptioSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "axeptio:jsGlobal:2",
			kind: "jsGlobal",
			property: "axeptioSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "axeptio:dom:3",
			kind: "dom",
			selector: "img[src*='axeptio.imgix.net/'], div#axeptio_overlay",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "axeptio:jsGlobal:4",
			kind: "jsGlobal",
			property: "axeptioBuildTimestamp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "axeptio:jsGlobal:5",
			kind: "jsGlobal",
			property: "axeptioHandleVendors",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "axeptio:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^axeptio_all_vendors$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "axeptio:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^axeptio_authorized_vendors$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "axeptio:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^axeptio_cookies$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
