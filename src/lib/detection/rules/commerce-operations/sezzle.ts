import type { TechnologyDefinition } from '../../types';

export const sezzleTechnologyDefinition = {
	id: "sezzle",
	name: "Sezzle",
	website: "https://sezzle.com/",
	description: "Sezzle offers a buy-now-pay-later solution.",
	icon: "Sezzle.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sezzle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.sezzle\\.(?:in|com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sezzle:jsGlobal:1",
			kind: "jsGlobal",
			property: "AwesomeSezzle",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sezzle:jsGlobal:2",
			kind: "jsGlobal",
			property: "renderSezzleIframe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sezzle:jsGlobal:3",
			kind: "jsGlobal",
			property: "sezzle_footer_images",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
