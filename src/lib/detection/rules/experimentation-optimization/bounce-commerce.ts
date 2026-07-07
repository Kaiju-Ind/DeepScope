import type { TechnologyDefinition } from '../../types';

export const bounceCommerceTechnologyDefinition = {
	id: "bounce-commerce",
	name: "Bounce Commerce",
	website: "https://www.bounce-commerce.de",
	description: "Bounce Commerce is a provider of AI-based engagement solutions that enhance conversion rates by assisting customers in finding the right products.",
	icon: "BounceCommerce.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bounce-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.bounce-commerce\\.de"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bounce-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "baBounceManagement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bounce-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "bavBounceManagement",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
