import type { TechnologyDefinition } from '../../types';

export const looksizeTechnologyDefinition = {
	id: "looksize",
	name: "Looksize",
	website: "https://www.looksize.com",
	description: "Looksize is a virtual fitting room solution for ecommerce that allows customers to try on clothes digitally before making a purchase, enhancing the online shopping experience.",
	icon: "Looksize.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "looksize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.looksize\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "looksize:jsGlobal:1",
			kind: "jsGlobal",
			property: "LS.api_key",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
