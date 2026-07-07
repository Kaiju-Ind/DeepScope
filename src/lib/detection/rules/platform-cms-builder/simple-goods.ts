import type { TechnologyDefinition } from '../../types';

export const simpleGoodsTechnologyDefinition = {
	id: "simple-goods",
	name: "Simple Goods",
	website: "https://simplegoods.co",
	description: "Simple Goods is a platform that enables online selling through a website.",
	icon: "SimpleGoods.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "simple-goods:dom:0",
			kind: "dom",
			selector: "link[href*='app.simplegoods.co/']",
			description: "DOM selector matches a known technology marker.",
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
