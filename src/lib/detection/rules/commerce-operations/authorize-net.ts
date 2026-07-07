import type { TechnologyDefinition } from '../../types';

export const authorizeNetTechnologyDefinition = {
	id: "authorize-net",
	name: "authorize.net",
	website: "https://www.authorize.net",
	description: "Authorize.net is a secure online payment gateway service that enables businesses to accept payments through various channels, such as ecommerce websites, mobile devices, and retail stores, providing a trusted platform for processing credit card and electronic cheque payments.",
	icon: "authorize.net.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "authorize-net:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.authorize\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "authorize-net:jsGlobal:1",
			kind: "jsGlobal",
			property: "config.authorizenet_public_client_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "authorize-net:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.authorize\\.net\\s", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "authorize-net:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.authorize\\.net\\s", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
