import type { TechnologyDefinition } from '../../types';

export const opencartTechnologyDefinition = {
	id: "opencart",
	name: "OpenCart",
	website: "https://www.opencart.com",
	description: "OpenCart is a free and open-source ecommerce platform used for creating and managing online stores. It is written in PHP and uses a MySQL database to store information.",
	icon: "OpenCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opencart:dom:0",
			kind: "dom",
			selector: "link[href*='catalog/view/theme/rgen-opencart/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "opencart:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^OCSESSID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "opencart:dom:2",
			kind: "dom",
			selector: "link[href*='catalog/view/theme/rgen-opencart/'], footer#footer > a[href*='shop.opencart-russia.ru']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "opencart:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^ocsessid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:opencart:opencart:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
