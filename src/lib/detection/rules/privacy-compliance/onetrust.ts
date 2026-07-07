import type { TechnologyDefinition } from '../../types';

export const onetrustTechnologyDefinition = {
	id: "onetrust",
	name: "OneTrust",
	website: "https://www.onetrust.com",
	description: "OneTrust is a cloud-based data privacy management compliance platform.",
	icon: "OneTrust.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "onetrust:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cookielaw\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onetrust:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("optanon\\.blob\\.core\\.windows\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onetrust:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("otSDKStub\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onetrust:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^OptanonConsent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "onetrust:dns:4",
			kind: "dns",
			valuePattern: new RegExp("onetrust-domain-verification=", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "onetrust:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("otsdkstub\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onetrust:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^optanonconsent$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
