import type { TechnologyDefinition } from '../../types';

export const printfulTechnologyDefinition = {
	id: "printful",
	name: "Printful",
	website: "https://www.printful.com/",
	description: "Printful offers print-on-demand drop shipping solution for ecommerce sites.",
	icon: "Printful.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "printful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cdn\\.printful\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "printful:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.printful\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
