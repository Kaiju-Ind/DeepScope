import type { TechnologyDefinition } from '../../types';

export const veryGoodSecurityTechnologyDefinition = {
	id: "very-good-security",
	name: "Very Good Security",
	website: "https://www.verygoodsecurity.com",
	description: "Very Good Security (VGS) is a data security and compliance platform that enables developers to securely handle sensitive data by encrypting, tokenising, and transmitting it through an intermediary service.",
	icon: "Very Good Security.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "very-good-security:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.verygoodvault\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "very-good-security:jsGlobal:1",
			kind: "jsGlobal",
			property: "VGSCollect",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "very-good-security:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.verygoodvault\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "very-good-security:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.verygoodvault\\.com", "i"),
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
