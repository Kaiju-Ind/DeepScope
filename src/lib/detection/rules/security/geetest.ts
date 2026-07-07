import type { TechnologyDefinition } from '../../types';

export const geetestTechnologyDefinition = {
	id: "geetest",
	name: "GeeTest",
	website: "https://www.geetest.com",
	description: "GeeTest is a CAPTCHA and bot management provider, protects websites, mobile apps, and APIs from automated bot-driven attacks, like ATO, credential stuffing, web scalping, etc.",
	icon: "GeeTest.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "geetest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.geetest\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "geetest:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.geetest\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
