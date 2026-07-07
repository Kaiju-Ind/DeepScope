import type { TechnologyDefinition } from '../../types';

export const valuecommerceTechnologyDefinition = {
	id: "valuecommerce",
	name: "ValueCommerce",
	website: "https://www.valuecommerce.co.jp",
	description: "ValueCommerce is a pay-per-performance advertising affiliate marketing network.",
	icon: "ValueCommerce.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "valuecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.valuecommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "valuecommerce:dom:1",
			kind: "dom",
			selector: "a[href*='ap.valuecommerce.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "valuecommerce:dom:2",
			kind: "dom",
			selector: "img[src*='ap.valuecommerce.com'],img[data-src*='ap.valuecommerce.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
