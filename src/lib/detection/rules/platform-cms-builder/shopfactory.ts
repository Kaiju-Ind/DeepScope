import type { TechnologyDefinition } from '../../types';

export const shopfactoryTechnologyDefinition = {
	id: "shopfactory",
	name: "ShopFactory",
	website: "https://www.shopfactory.com",
	description: "ShopFactory is an all-in-one ecommerce platform that allows businesses to create and manage their online stores without the need for extensive technical expertise.",
	icon: "ShopFactory.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopfactory:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ShopFactory V([0-9.]+) www\\.shopfactory\\.com$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shopfactory:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^shopfactory v([0-9.]+) www\\.shopfactory\\.com$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
