import type { TechnologyDefinition } from '../../types';

export const kitcartTechnologyDefinition = {
	id: "kitcart",
	name: "Kitcart",
	website: "https://kitcart.net",
	description: "KitCart is a cloud-based solution that helps businesses build ecommerce stores, manage inventory, and more.",
	icon: "Kitcart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kitcart:dom:0",
			kind: "dom",
			selector: "a[href*='kitcart.net'][target='_blank'], form[action*='kitcart.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kitcart:dom:1",
			kind: "dom",
			selector: "form[action*='usekitcart.com/'], form[action*='kitcart.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kitcart:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^kitcart_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"laravel",
		"php",
	],
} as const satisfies TechnologyDefinition;
