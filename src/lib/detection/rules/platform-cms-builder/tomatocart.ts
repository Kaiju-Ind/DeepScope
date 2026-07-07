import type { TechnologyDefinition } from '../../types';

export const tomatocartTechnologyDefinition = {
	id: "tomatocart",
	name: "TomatoCart",
	website: "https://tomatocart.com",
	icon: "TomatoCart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tomatocart:jsGlobal:0",
			kind: "jsGlobal",
			property: "AjaxShoppingCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tomatocart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("TomatoCart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tomatocart:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("tomatocart", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:tomatocart:tomatocart:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
