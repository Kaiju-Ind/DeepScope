import type { TechnologyDefinition } from '../../types';

export const friendbuyTechnologyDefinition = {
	id: "friendbuy",
	name: "Friendbuy",
	website: "https://www.friendbuy.com",
	description: "Friendbuy is a cloud-based referral marketing solution designed to help ecommerce businesses of all sizes.",
	icon: "Friendbuy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "friendbuy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudfront\\.net\\/js\\/friendbuy\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "friendbuy:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.fbot\\.me\\/friendbuy\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "friendbuy:jsGlobal:2",
			kind: "jsGlobal",
			property: "friendbuy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "friendbuy:jsGlobal:3",
			kind: "jsGlobal",
			property: "friendbuyAPI.merchantId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
