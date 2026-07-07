import type { TechnologyDefinition } from '../../types';

export const netsuiteTechnologyDefinition = {
	id: "netsuite",
	name: "NetSuite",
	website: "https://netsuite.com",
	description: "NetSuite is a cloud-based enterprise resource planning (ERP) software suite that provides a comprehensive set of business management applications, including financial management, CRM, ecommerce, and more.",
	icon: "NetSuite.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "netsuite:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^NS_VER$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "netsuite:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ns_ver$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
