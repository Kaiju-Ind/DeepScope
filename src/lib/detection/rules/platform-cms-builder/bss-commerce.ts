import type { TechnologyDefinition } from '../../types';

export const bssCommerceTechnologyDefinition = {
	id: "bss-commerce",
	name: "BSS Commerce",
	website: "https://bsscommerce.com",
	description: "BSS Commerce is an ecommerce platform providing technology solutions for B2B, B2C, and B2B2C businesses.",
	icon: "BSSCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bss-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.bsscommerce\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bss-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "BSS_PL.$",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bss-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "bss-po-js",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
