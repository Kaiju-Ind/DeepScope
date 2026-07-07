import type { TechnologyDefinition } from '../../types';

export const webflowEcommerceTechnologyDefinition = {
	id: "webflow-ecommerce",
	name: "Webflow Ecommerce",
	website: "https://webflow.com/ecommerce",
	description: "Webflow is a zero-code visual website builder, with Webflow Ecommerce, you can build and design online stores.",
	icon: "webflow.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webflow-ecommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "__WEBFLOW_CURRENCY_SETTINGS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
