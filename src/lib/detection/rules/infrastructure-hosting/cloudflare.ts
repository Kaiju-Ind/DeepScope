import type { TechnologyDefinition } from '../../types';

export const cloudflareTechnologyDefinition = {
	id: "cloudflare",
	name: "Cloudflare",
	website: "https://www.cloudflare.com",
	description: "Cloudflare is a web-infrastructure and website-security company, providing content-delivery-network services, DDoS mitigation, Internet security, and distributed domain-name-server services.",
	icon: "CloudFlare.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "cloudflare:dom:0",
			kind: "dom",
			selector: "img[src*='//cdn.cloudflare']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cloudflare:jsGlobal:1",
			kind: "jsGlobal",
			property: "CloudFlare",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cloudflare:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^__cfduid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "cloudflare:header:3",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^cloudflare$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "cloudflare:meta:4",
			kind: "meta",
			key: "image",
			valuePattern: new RegExp("\\/\\/cdn\\.cloudflare", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cloudflare:dns:5",
			kind: "dns",
			valuePattern: new RegExp("\\.cloudflare\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "cloudflare:dns:6",
			kind: "dns",
			valuePattern: new RegExp("\\.cloudflare\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "cloudflare:header:7",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^cloudflare$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cloudflare:cloudflare:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
