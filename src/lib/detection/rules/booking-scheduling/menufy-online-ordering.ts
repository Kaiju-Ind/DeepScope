import type { TechnologyDefinition } from '../../types';

export const menufyOnlineOrderingTechnologyDefinition = {
	id: "menufy-online-ordering",
	name: "Menufy Online Ordering",
	website: "https://restaurant.menufy.com",
	description: "Menufy is an online and mobile meal ordering service.",
	icon: "Menufy.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "menufy-online-ordering:dom:0",
			kind: "dom",
			selector: "a[href*='.menufy.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
