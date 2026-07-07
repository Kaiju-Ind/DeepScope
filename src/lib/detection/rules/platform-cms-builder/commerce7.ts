import type { TechnologyDefinition } from '../../types';

export const commerce7TechnologyDefinition = {
	id: "commerce7",
	name: "Commerce7",
	website: "https://commerce7.com",
	description: "Commerce7 is an ecommerce platform for wineries.",
	icon: "Commerce7.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commerce7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.commerce7\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "commerce7:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.commerce7\\.com"),
			description: "Observed request URL matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
