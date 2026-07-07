import type { TechnologyDefinition } from '../../types';

export const yoomoneyTechnologyDefinition = {
	id: "yoomoney",
	name: "YooMoney",
	website: "https://yoomoney.ru",
	description: "YooMoney is an IT company working with electronic payments on the Internet, creating and supporting financial services for individuals and businesses.",
	icon: "YooMoney.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yoomoney:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.yoomoney\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yoomoney:dom:1",
			kind: "dom",
			selector: "a[href*='yoomoney.ru'][target='_blank'], iframe[src*='yoomoney.ru'], img[src*='yoomoney.ru']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoomoney:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.yoomoney\\.ru", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "yoomoney:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.yoomoney\\.ru", "i"),
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
