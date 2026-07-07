import type { TechnologyDefinition } from '../../types';

export const rocCommerceTechnologyDefinition = {
	id: "roc-commerce",
	name: "ROC Commerce",
	website: "https://www.roccommerce.com",
	description: "ROC Commerce is an omni-channel commerce solution designed for B2B and B2C businesses, enabling streamlined ecommerce operations across multiple platforms.",
	icon: "ROCCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "roc-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "RocConfig.api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roc-commerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "RocTemplates",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roc-commerce:header:2",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("search\\.roccommerce\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "roc-commerce:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("search\\.roccommerce\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
