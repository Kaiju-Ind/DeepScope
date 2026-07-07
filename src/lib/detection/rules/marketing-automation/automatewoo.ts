import type { TechnologyDefinition } from '../../types';

export const automatewooTechnologyDefinition = {
	id: "automatewoo",
	name: "AutomateWoo",
	website: "https://automatewoo.com",
	description: "AutomateWoo is a marketing automation plugin for WooCommerce that enables online stores to create automated workflows for emails, follow-ups, and customer engagement.",
	icon: "AutomateWoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "automatewoo:dom:0",
			kind: "dom",
			selector: "link#automatewoo-birthdays-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "automatewoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "automatewoo_presubmit_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
