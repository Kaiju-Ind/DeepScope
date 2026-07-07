import type { TechnologyDefinition } from '../../types';

export const technology6valleyEcommerceCmsTechnologyDefinition = {
	id: "6valley-ecommerce-cms",
	name: "6Valley eCommerce CMS",
	website: "https://6valley.app",
	description: "6Valley eCommerce CMS is a multi-vendor platform designed to facilitate business launches by providing tools for managing vendors, products, and transactions within an ecommerce ecosystem.",
	icon: "6ValleyEcommerceCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "6valley-ecommerce-cms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("6valley_cookie_consent"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "6valley-ecommerce-cms:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^6valley_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
