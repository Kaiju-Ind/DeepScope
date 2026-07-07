import type { TechnologyDefinition } from '../../types';

export const oracleCommerceTechnologyDefinition = {
	id: "oracle-commerce",
	name: "Oracle Commerce",
	website: "https://www.oracle.com/applications/customer-experience/commerce/products/commerce-platform/index.html",
	description: "Oracle Commerce is a unified B2B and B2C ecommerce platform.",
	icon: "Oracle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oracle-commerce:dom:0",
			kind: "dom",
			selector: "input[name*='/atg/commerce/'], .atgShoppingBagContent",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oracle-commerce:header:1",
			kind: "header",
			key: "X-ATG-Version",
			valuePattern: new RegExp("(?:ATGPlatform\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oracle-commerce:header:2",
			kind: "header",
			key: "x-atg-version",
			valuePattern: new RegExp("(?:atgplatform\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:oracle:commerce_platform:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
