import type { TechnologyDefinition } from '../../types';

export const f5BigipTechnologyDefinition = {
	id: "f5-bigip",
	name: "F5 BigIP",
	website: "https://www.f5.com/products/big-ip-services",
	description: "F5's BIG-IP is a family of products covering software and hardware designed around application availability, access control, and security solutions.",
	icon: "F5.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "f5-bigip:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^F5_HT_shrinked$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^F5_ST$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^F5_fullWT$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^LastMRH_Session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^MRHSHint$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^MRHSequence$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^MRHSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^TIN$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:header:8",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^big-?ip$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^f5_fullwt$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^f5_ht_shrinked$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^f5_st$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^lastmrh_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:13",
			kind: "cookie",
			keyPattern: new RegExp("^mrhsequence$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:14",
			kind: "cookie",
			keyPattern: new RegExp("^mrhsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:15",
			kind: "cookie",
			keyPattern: new RegExp("^mrhshint$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "f5-bigip:cookie:16",
			kind: "cookie",
			keyPattern: new RegExp("^tin$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:f5:big-ip:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
