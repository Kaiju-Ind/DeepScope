import type { TechnologyDefinition } from '../../types';

export const workareaTechnologyDefinition = {
	id: "workarea",
	name: "Workarea",
	website: "https://www.workarea.com",
	description: "Workarea is a SaaS ecommerce platform for medium to large businesses.",
	icon: "Workarea.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "workarea:jsGlobal:0",
			kind: "jsGlobal",
			property: "WEBLINC.cartCount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "workarea:jsGlobal:1",
			kind: "jsGlobal",
			property: "workarea",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	implies: [
		"elasticsearch",
		"mongodb",
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
