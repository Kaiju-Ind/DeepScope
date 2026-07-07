import type { TechnologyDefinition } from '../../types';

export const brownieTechnologyDefinition = {
	id: "brownie",
	name: "Brownie",
	website: "https://www.browniesuite.com",
	description: "Brownie is a framework, CMS, ecommerce and ERP omni-channel platform to manage your entire business in one cloud solution.",
	icon: "Brownie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brownie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.youthsrl\\.com\\/brownie"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brownie:dom:1",
			kind: "dom",
			selector: "a[href*='browniesuite.com'][target='_blank'] img[src*='brownie']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "brownie:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Brownie", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "brownie:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("brownie", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
	implies: [
		"amazon-web-services",
		"bootstrap",
		"jquery",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
