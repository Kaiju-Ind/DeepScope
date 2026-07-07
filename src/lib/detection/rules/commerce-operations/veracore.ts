import type { TechnologyDefinition } from '../../types';

export const veracoreTechnologyDefinition = {
	id: "veracore",
	name: "VeraCore",
	website: "https://www.advantive.com/products/veracore",
	description: "VeraCore is an order fulfillment software platform that supports inventory management, warehousing, order processing, and shipping operations.",
	icon: "VeraCore.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "veracore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.veracore\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "veracore:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.veracore\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "veracore:jsGlobal:2",
			kind: "jsGlobal",
			property: "VeraCore.API",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:advantive:veracore:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
