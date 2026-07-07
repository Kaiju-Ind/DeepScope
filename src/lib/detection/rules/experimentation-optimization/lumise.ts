import type { TechnologyDefinition } from '../../types';

export const lumiseTechnologyDefinition = {
	id: "lumise",
	name: "Lumise",
	website: "https://lumise.com",
	description: "Lumise is a solution for personalisation stores, featuring a product designer tool compatible with Woocommerce, PHP, Magento, Opencart, and other CMS platforms.",
	icon: "Lumise.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "lumise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.lumise\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lumise:jsGlobal:1",
			kind: "jsGlobal",
			property: "lumise",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
