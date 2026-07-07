import type { TechnologyDefinition } from '../../types';

export const harborbyteTechnologyDefinition = {
	id: "harborbyte",
	name: "HarborByte",
	website: "https://harborbyte.com",
	description: "HarborByte is a small business website platform that provides templated sites with integrated ecommerce, marketing, and hosting solutions.",
	icon: "HarborByte.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "harborbyte:header:0",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("harborbyte\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "harborbyte:meta:1",
			kind: "meta",
			key: "content-security-policy",
			valuePattern: new RegExp("harborbyte-media-assets\\.pages\\.dev", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "harborbyte:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Website by HarborByte$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "harborbyte:header:3",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("harborbyte\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "harborbyte:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^website by harborbyte$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
