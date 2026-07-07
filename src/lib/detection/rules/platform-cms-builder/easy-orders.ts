import type { TechnologyDefinition } from '../../types';

export const easyOrdersTechnologyDefinition = {
	id: "easy-orders",
	name: "Easy Orders",
	website: "https://www.easy-orders.net",
	description: "Easy Orders is an ecommerce platform that offers a pricing plan where users can create their online store and pay a fee of 0.5 EGP per order.",
	icon: "Easy Orders.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "easy-orders:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.easy-orders\\.net\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "easy-orders:dom:1",
			kind: "dom",
			selector: "img[src*='easyorders.fra1.digitaloceanspaces.com/'], link[href*='easyorders.fra1.digitaloceanspaces.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	implies: [
		"go",
		"node-js",
		"postgresql",
	],
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
