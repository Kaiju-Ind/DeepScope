import type { TechnologyDefinition } from '../../types';

export const aispeedTechnologyDefinition = {
	id: "aispeed",
	name: "AiSpeed",
	website: "https://apps.shopify.com/aispeed",
	description: "AiSpeed is a shopify app focused on improving site speed.",
	icon: "AiSpeed.png",
	categories: [
		"monitoring-error-tracking",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "aispeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("aispeed\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aispeed:jsGlobal:1",
			kind: "jsGlobal",
			property: "aispeed_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
