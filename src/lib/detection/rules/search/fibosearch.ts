import type { TechnologyDefinition } from '../../types';

export const fibosearchTechnologyDefinition = {
	id: "fibosearch",
	name: "FiboSearch",
	website: "https://fibosearch.com",
	description: "FiboSearch is a WooCommerce product search plugin, formerly known as AJAX Search.",
	icon: "FiboSearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "fibosearch:jsGlobal:0",
			kind: "jsGlobal",
			property: "dgwt_wcas.ajax_search_endpoint",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
