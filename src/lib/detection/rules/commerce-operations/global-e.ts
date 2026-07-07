import type { TechnologyDefinition } from '../../types';

export const globalETechnologyDefinition = {
	id: "global-e",
	name: "Global-e",
	website: "https://www.global-e.com",
	description: "Global-e is a provider of cross-border ecommerce solutions.",
	icon: "Global-e.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "global-e:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.global-e\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "global-e:jsGlobal:1",
			kind: "jsGlobal",
			property: "GLOBALE_ENGINE_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "global-e:jsGlobal:2",
			kind: "jsGlobal",
			property: "GlobalE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "global-e:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^GlobalE_CT_Data$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^GlobalE_Data$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^GlobalE_SupportThirdPartCookies$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:jsGlobal:6",
			kind: "jsGlobal",
			property: "GLBE_PARAMS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "global-e:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^GLBE_SESS_ID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^GlobalE_Consent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^glbe_sess_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^globale_consent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^globale_ct_data$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^globale_data$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "global-e:cookie:13",
			kind: "cookie",
			keyPattern: new RegExp("^globale_supportthirdpartcookies$", "i"),
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
