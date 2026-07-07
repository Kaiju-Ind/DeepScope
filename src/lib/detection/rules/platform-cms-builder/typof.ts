import type { TechnologyDefinition } from '../../types';

export const typofTechnologyDefinition = {
	id: "typof",
	name: "Typof",
	website: "https://typof.com",
	description: "Typof is an ecommerce platform for artisans that allows to create a premium website and sell items directly to the consumer.",
	icon: "Typof.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "typof:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("portal\\/js\\/typof\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "typof:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^typof_session$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
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
