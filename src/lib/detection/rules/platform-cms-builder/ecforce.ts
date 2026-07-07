import type { TechnologyDefinition } from '../../types';

export const ecforceTechnologyDefinition = {
	id: "ecforce",
	name: "EcForce",
	website: "https://ec-force.com",
	description: "EcForce is an all-in-one ecommerce platform with all the functions necessary for ecommerce, from landing-page creation to order and customer data management analysis.",
	icon: "EcForce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecforce:jsGlobal:0",
			kind: "jsGlobal",
			property: "EcForce.Models",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ecforce:jsGlobal:1",
			kind: "jsGlobal",
			property: "EcForce.Models.Shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ecforce:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_ec_force_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"nginx",
		"ruby",
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
