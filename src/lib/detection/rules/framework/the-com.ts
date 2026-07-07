import type { TechnologyDefinition } from '../../types';

export const theComTechnologyDefinition = {
	id: "the-com",
	name: "The.com",
	website: "https://www.the.com",
	description: "The.com is a low-code website building platform with community-created components that you can share and own.",
	icon: "The.com.svg",
	categories: [
		"framework",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "the-com:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("the-dotcom-public-cdn\\.s3\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"amazon-s3",
		"react",
	],
} as const satisfies TechnologyDefinition;
