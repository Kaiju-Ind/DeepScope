import type { TechnologyDefinition } from '../../types';

export const ipbTechnologyDefinition = {
	id: "ipb",
	name: "IPB",
	website: "https://invisioncommunity.com/",
	icon: "IPB.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "ipb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jscripts\\/ips_"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ipb:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+ipb_[^>]+\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "ipb:jsGlobal:2",
			kind: "jsGlobal",
			property: "IPBoard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ipb:jsGlobal:3",
			kind: "jsGlobal",
			property: "ipb_var",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ipb:jsGlobal:4",
			kind: "jsGlobal",
			property: "ipsSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ipb:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^ipbWWLmodpids$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ipb:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^ipbWWLsession_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ipb:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^ipbwwlmodpids$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ipb:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^ipbwwlsession_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
