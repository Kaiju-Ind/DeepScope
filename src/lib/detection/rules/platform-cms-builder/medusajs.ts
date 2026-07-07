import type { TechnologyDefinition } from '../../types';

export const medusajsTechnologyDefinition = {
	id: "medusajs",
	name: "Medusajs",
	website: "https://medusajs.com",
	description: "Medusa is an open-source ecommerce platform that enables users to create online stores.",
	icon: "MedusaJs.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "medusajs:dom:0",
			kind: "dom",
			selector: "div.content-container > a[href*='www.medusajs.com'], a[href*='mailto:hello@medusajs.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "medusajs:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^medusa\\.sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
