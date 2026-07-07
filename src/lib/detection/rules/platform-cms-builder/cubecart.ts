import type { TechnologyDefinition } from '../../types';

export const cubecartTechnologyDefinition = {
	id: "cubecart",
	name: "CubeCart",
	website: "https://www.cubecart.com",
	description: "CubeCart is a free ecommerce platform that businesses can use to build, manage, and market their online stores.",
	icon: "CubeCart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cubecart:dom:0",
			kind: "dom",
			selector: "a[href*='.cubecart.com'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "cubecart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cubecart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:cubecart:cubecart:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
