import type { TechnologyDefinition } from '../../types';

export const shift4shopTechnologyDefinition = {
	id: "shift4shop",
	name: "Shift4Shop",
	website: "https://www.shift4shop.com",
	description: "Shift4Shop, formerly known as 3Dcart, is an ecommerce software provider for online businesses.",
	icon: "Shift4Shop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shift4shop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:twlh(?:track)?\\.asp|3d_upsell\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shift4shop:jsGlobal:1",
			kind: "jsGlobal",
			property: "_3d_cart.subtotal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shift4shop:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^3dvisit$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "shift4shop:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("3DCART", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shift4shop:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("3dcart", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
