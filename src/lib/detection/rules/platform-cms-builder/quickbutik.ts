import type { TechnologyDefinition } from '../../types';

export const quickbutikTechnologyDefinition = {
	id: "quickbutik",
	name: "Quickbutik",
	website: "https://quickbutik.com",
	description: "Quickbutik is an all-in-one ecommerce platform from Sweden.",
	icon: "Quickbutik.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quickbutik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quickbutik\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quickbutik:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Quickbutik$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "quickbutik:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^quickbutik$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
