import type { TechnologyDefinition } from '../../types';

export const vtexTechnologyDefinition = {
	id: "vtex",
	name: "VTEX",
	website: "https://vtex.com/",
	description: "VTEX is an ecommerce software that manages multiple online stores.",
	icon: "VTEX.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vtex:dom:0",
			kind: "dom",
			selector: "link[href*='.vteximg.com.br'], source[srcset*='.vteximg.com.br']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vtex:jsGlobal:1",
			kind: "jsGlobal",
			property: "vtex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vtex:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^VtexFingerPrint$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^VtexStoreVersion$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^VtexWorkspace$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^vtex_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:header:6",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^VTEX IO$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vtex:header:7",
			kind: "header",
			key: "powered",
			valuePattern: new RegExp("vtex", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vtex:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^vtexfingerprint$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^vtexstoreversion$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^vtexworkspace$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vtex:header:11",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^vtex io$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
