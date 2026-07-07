import type { TechnologyDefinition } from '../../types';

export const avangateTechnologyDefinition = {
	id: "avangate",
	name: "Avangate",
	website: "https://www.2checkout.com",
	description: "Avangate (2Checkout) is a digital ecommerce platform for businesses that sell physical goods or digital products.",
	icon: "Avangate.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "avangate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/edge\\.avangate\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "avangate:jsGlobal:1",
			kind: "jsGlobal",
			property: "AvaCart.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "avangate:jsGlobal:2",
			kind: "jsGlobal",
			property: "__avng8_callbacks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "avangate:jsGlobal:3",
			kind: "jsGlobal",
			property: "avaSlugify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"verifone-2checkout",
	],
} as const satisfies TechnologyDefinition;
