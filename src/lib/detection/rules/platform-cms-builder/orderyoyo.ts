import type { TechnologyDefinition } from '../../types';

export const orderyoyoTechnologyDefinition = {
	id: "orderyoyo",
	name: "OrderYOYO",
	website: "https://orderyoyo.com",
	description: "OrderYOYO is an online ordering, payment, and marketing software solution provider.",
	icon: "OrderYOYO.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "orderyoyo:dom:0",
			kind: "dom",
			selector: "a[href*='.orderyoyo.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "orderyoyo:jsGlobal:1",
			kind: "jsGlobal",
			property: "SmartBannerOY",
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
