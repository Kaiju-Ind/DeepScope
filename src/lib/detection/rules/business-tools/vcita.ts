import type { TechnologyDefinition } from '../../types';

export const vcitaTechnologyDefinition = {
	id: "vcita",
	name: "vcita",
	website: "https://www.vcita.com",
	description: "vcita is an all-in-one customer service and business management software designed for service providers.",
	icon: "vcita.svg",
	categories: [
		"business-tools",
		"booking-scheduling",
	],
	rules: [
		{
			id: "vcita:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.vcita\\.com\\/widgets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vcita:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.vcdnita\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vcita:dom:2",
			kind: "dom",
			selector: "iframe[src*='www.vcita.com/widgets/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "vcita:jsGlobal:3",
			kind: "jsGlobal",
			property: "LiveSite.btCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vcita:jsGlobal:4",
			kind: "jsGlobal",
			property: "Vcita",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
