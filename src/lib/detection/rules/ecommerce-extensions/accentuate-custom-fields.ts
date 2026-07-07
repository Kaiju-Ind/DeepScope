import type { TechnologyDefinition } from '../../types';

export const accentuateCustomFieldsTechnologyDefinition = {
	id: "accentuate-custom-fields",
	name: "Accentuate Custom Fields",
	website: "https://www.accentuate.io",
	description: "Accentuate Custom Fields is the professional and de facto solution to easily extend your Shopify store with your own custom fields such multi-language text fields, images, checkboxes, dates, selection list and custom JSON objects.",
	icon: "Accentuate Custom Fields.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "accentuate-custom-fields:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.accentuate\\.io\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "accentuate-custom-fields:dom:1",
			kind: "dom",
			selector: "a[style*='.accentuate.io/'], a[data-bg*='.accentuate.io/'], div[style*='.accentuate.io/'], img[src*='.accentuate.io/'], img[data-src*='.accentuate.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
