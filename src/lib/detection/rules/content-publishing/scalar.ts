import type { TechnologyDefinition } from '../../types';

export const scalarTechnologyDefinition = {
	id: "scalar",
	name: "Scalar",
	website: "https://scalar.com",
	description: "Scalar is a platform that offers tools for API documentation, testing, and discovery, with strong support for OpenAPI standards.",
	icon: "Scalar.svg",
	categories: [
		"content-publishing",
		"developer-tooling",
	],
	rules: [
		{
			id: "scalar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/@scalar\\/api-reference@(\\d+\\.\\d+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "scalar:dom:1",
			kind: "dom",
			selector: "div[class*='scalar-api-reference']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"typescript",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
