import type { TechnologyDefinition } from '../../types';

export const pearCommerceTechnologyDefinition = {
	id: "pear-commerce",
	name: "Pear Commerce",
	website: "https://www.pearcommerce.com",
	description: "Pear Commerce is a next-gen retail ecommerce platform connecting CPGs to retailers by transforming shoppable tools into actionable marketing insights.",
	icon: "PearCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pear-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "PEAR_WIDGET_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pear-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "PEAR_WIDGET_CONFIG.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pear-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "PEAR_WIDGET_CONFIGS.default",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
