import type { TechnologyDefinition } from '../../types';

export const simplesamlphpTechnologyDefinition = {
	id: "simplesamlphp",
	name: "SimpleSAMLphp",
	website: "https://simplesamlphp.org",
	description: "SimpleSAMLphp is an open-source PHP authentication application that provides support for SAML 2.0 as a Service Provider (SP) or Identity Provider (IdP).",
	icon: "default.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "simplesamlphp:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^SimpleSAML$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "simplesamlphp:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^SimpleSAMLSessionID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "simplesamlphp:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^simplesaml$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "simplesamlphp:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^simplesamlsessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:simplesamlphp:simplesamlphp:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
