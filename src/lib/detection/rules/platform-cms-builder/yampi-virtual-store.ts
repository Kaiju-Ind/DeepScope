import type { TechnologyDefinition } from '../../types';

export const yampiVirtualStoreTechnologyDefinition = {
	id: "yampi-virtual-store",
	name: "Yampi Virtual store",
	website: "https://www.yampi.com.br/loja-virtual",
	description: "Yampi Virtual store is an ecommerce platform from Brazil.",
	icon: "Yampi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yampi-virtual-store:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.yampi\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yampi-virtual-store:jsGlobal:1",
			kind: "jsGlobal",
			property: "Yampi.api_domain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yampi-virtual-store:jsGlobal:2",
			kind: "jsGlobal",
			property: "Yampi.cart_token",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"yampi-checkout",
	],
} as const satisfies TechnologyDefinition;
