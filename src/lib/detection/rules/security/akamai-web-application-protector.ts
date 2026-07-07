import type { TechnologyDefinition } from '../../types';

export const akamaiWebApplicationProtectorTechnologyDefinition = {
	id: "akamai-web-application-protector",
	name: "Akamai Web Application Protector",
	website: "https://www.akamai.com/us/en/products/security/web-application-protector-enterprise-waf-firewall-ddos-protection.jsp",
	description: "Akamai Web Application Protector is designed for companies looking for a more automated approach to web application firewall (WAF) and distributed denial-of-service (DDoS) security.",
	icon: "Akamai.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "akamai-web-application-protector:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ds-aksb-a\\.akamaihd\\.net\\/aksb.min.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "akamai-web-application-protector:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("aksb\\.min\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "akamai-web-application-protector:jsGlobal:2",
			kind: "jsGlobal",
			property: "AKSB",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"akamai",
	],
} as const satisfies TechnologyDefinition;
