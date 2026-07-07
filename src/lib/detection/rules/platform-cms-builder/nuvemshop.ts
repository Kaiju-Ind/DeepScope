import type { TechnologyDefinition } from '../../types';

export const nuvemshopTechnologyDefinition = {
	id: "nuvemshop",
	name: "Nuvemshop",
	website: "https://www.nuvemshop.com.br",
	description: "Nuvemshop is a website builder with customizable layouts, product, shipping and payment management, marketing tools and a mobile app.",
	icon: "Nuvemshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nuvemshop:dom:0",
			kind: "dom",
			selector: "a[href*='www.nuvemshop.com.br'][title*='Nuvemshop'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nuvemshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "LS.store.url",
			valuePattern: new RegExp("^.+nuvem.com.br$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nuvemshop:jsGlobal:2",
			kind: "jsGlobal",
			property: "nuvemShopIdProduct",
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
