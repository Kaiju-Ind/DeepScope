import type { TechnologyDefinition } from '../../types';

export const oracleCommerceCloudTechnologyDefinition = {
	id: "oracle-commerce-cloud",
	name: "Oracle Commerce Cloud",
	website: "https://cloud.oracle.com/commerce-cloud",
	description: "Oracle Commerce Cloud is a cloud-native, fully featured, extensible SaaS ecommerce solution, delivered in the Oracle Cloud, supporting B2C and B2B models in a single platform.",
	icon: "Oracle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oracle-commerce-cloud:dom:0",
			kind: "dom",
			selector: "#oracle-cc",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "oracle-commerce-cloud:header:1",
			kind: "header",
			key: "OracleCommerceCloud-Version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "oracle-commerce-cloud:header:2",
			kind: "header",
			key: "oraclecommercecloud-version",
			valuePattern: new RegExp("^(.+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
