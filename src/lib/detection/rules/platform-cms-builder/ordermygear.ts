import type { TechnologyDefinition } from '../../types';

export const ordermygearTechnologyDefinition = {
	id: "ordermygear",
	name: "OrderMyGear",
	website: "https://www.ordermygear.com",
	description: "OrderMyGear is an online store platform helping dealers, decorators and distributors create custom web stores.",
	icon: "OrderMyGear.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ordermygear:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mybrightsites\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ordermygear:jsGlobal:1",
			kind: "jsGlobal",
			property: "BrightSites",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ordermygear:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^omg_redesigned_cart$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
