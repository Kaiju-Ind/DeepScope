import type { TechnologyDefinition } from '../../types';

export const gumroadTechnologyDefinition = {
	id: "gumroad",
	name: "Gumroad",
	website: "https://gumroad.com",
	description: "Gumroad is a self-publishing digital marketplace platform to sell digital services such as books, memberships, courses and other digital services.",
	icon: "Gumroad.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gumroad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gumroad\\.com\\/js\\/gumroad\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gumroad:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("gumroad\\.com\\/js\\/gumroad-embed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gumroad:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("gumroad\\.com\\/packs\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gumroad:dom:3",
			kind: "dom",
			selector: "iframe[src^='https://gumroad.com/l/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gumroad:jsGlobal:4",
			kind: "jsGlobal",
			property: "GumroadOverlay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gumroad:jsGlobal:5",
			kind: "jsGlobal",
			property: "createGumroadOverlay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gumroad:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^_gumroad_app_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gumroad:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^_gumroad_guid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "gumroad:dns:8",
			kind: "dns",
			valuePattern: new RegExp("\\.gumroad\\.com", "i"),
			recordType: "CNAME",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
