import type { TechnologyDefinition } from '../../types';

export const commerceEngineTechnologyDefinition = {
	id: "commerce-engine",
	name: "Commerce Engine",
	website: "https://www.commercengine.io",
	description: "Commerce Engine is a headless SaaS platform that provides API-based ecommerce infrastructure including product search, order management, and fulfillment.",
	icon: "Commerce Engine.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commerce-engine:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("prod\\.api\\.commercengine\\.io\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "commerce-engine:dom:1",
			kind: "dom",
			selector: "img[srcset*='cdn.commercengine.io']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
