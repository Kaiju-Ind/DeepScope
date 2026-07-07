import type { TechnologyDefinition } from '../../types';

export const eloquaTechnologyDefinition = {
	id: "eloqua",
	name: "Eloqua",
	website: "https://eloqua.com",
	description: "Eloqua is a Software-as-a-Service (SaaS) platform for marketing automation offered that aims to help B2B marketers and organisations manage marketing campaigns and sales lead generation.",
	icon: "Oracle.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "eloqua:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("elqCfg\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:1",
			kind: "jsGlobal",
			property: "_elq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:2",
			kind: "jsGlobal",
			property: "_elqQ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:3",
			kind: "jsGlobal",
			property: "eloqContactData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:4",
			kind: "jsGlobal",
			property: "eloquaActionSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:5",
			kind: "jsGlobal",
			property: "elqCookieValue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:6",
			kind: "jsGlobal",
			property: "elqCurESite",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:7",
			kind: "jsGlobal",
			property: "elqLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:8",
			kind: "jsGlobal",
			property: "elqSiteID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:jsGlobal:9",
			kind: "jsGlobal",
			property: "elq_global",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eloqua:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^ELOQUA$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "eloqua:scriptSrc:11",
			kind: "scriptSrc",
			pattern: new RegExp("elqcfg\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eloqua:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^eloqua$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
