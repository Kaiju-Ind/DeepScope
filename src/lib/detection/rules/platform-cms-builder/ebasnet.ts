import type { TechnologyDefinition } from '../../types';

export const ebasnetTechnologyDefinition = {
	id: "ebasnet",
	name: "Ebasnet",
	website: "https://ebasnet.com",
	description: "Ebasnet is a web project creation and management platform in the cloud. It allows anyone to set up an online store or corporate website without prior IT knowledge.",
	icon: "Ebasnet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ebasnet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnebasnet\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ebasnet:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Ebasnet Web Solutions$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ebasnet:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^ebasnet web solutions$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
		"symfony",
		"varnish",
	],
} as const satisfies TechnologyDefinition;
