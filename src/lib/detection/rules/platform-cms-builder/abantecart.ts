import type { TechnologyDefinition } from '../../types';

export const abantecartTechnologyDefinition = {
	id: "abantecart",
	name: "AbanteCart",
	website: "https://www.abantecart.com",
	description: "AbanteCart is an open-source ecommerce platform designed to help businesses create and manage online stores with built-in product management, order processing, and customer engagement features.",
	icon: "AbanteCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "abantecart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^AbanteCart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "abantecart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^abantecart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:abantecart:abantecart:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
