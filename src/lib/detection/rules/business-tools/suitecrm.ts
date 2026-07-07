import type { TechnologyDefinition } from '../../types';

export const suitecrmTechnologyDefinition = {
	id: "suitecrm",
	name: "SuiteCRM",
	website: "https://suitecrm.com",
	description: "SuiteCRM is an open-source alternative to proprietary software such as Salesforce and Dynamics, offering customer relationship management features.",
	icon: "SuiteCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "suitecrm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/SuiteP\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "suitecrm:dom:1",
			kind: "dom",
			selector: "link[href*='dist/themes/suite8/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "suitecrm:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^SCRMSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "suitecrm:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/suitep\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "suitecrm:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^scrmsessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		cpe: "cpe:2.3:a:salesagility:suitecrm:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
