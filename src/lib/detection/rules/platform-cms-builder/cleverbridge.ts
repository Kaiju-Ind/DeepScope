import type { TechnologyDefinition } from '../../types';

export const cleverbridgeTechnologyDefinition = {
	id: "cleverbridge",
	name: "Cleverbridge",
	website: "https://www.cleverbridge.com",
	description: "Cleverbridge is a all-in-one ecommerce and subscription billing solution for software, (SaaS) and digital goods.",
	icon: "Cleverbridge.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cleverbridge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static-cf\\.cleverbridge\\.\\w+\\/js\\/Shop\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cleverbridge:jsGlobal:1",
			kind: "jsGlobal",
			property: "cbCartProductSelection",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cleverbridge:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("static-cf\\.cleverbridge\\.\\w+\\/js\\/shop\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
