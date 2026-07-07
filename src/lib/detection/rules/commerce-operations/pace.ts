import type { TechnologyDefinition } from '../../types';

export const paceTechnologyDefinition = {
	id: "pace",
	name: "Pace",
	website: "https://pacenow.co/",
	description: "PacePay offers a BNPL (Buy now pay later) solution for merchants.",
	icon: "Pace.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pace:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pay\\.pacenow\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pace:jsGlobal:1",
			kind: "jsGlobal",
			property: "pacePay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pace:jsGlobal:2",
			kind: "jsGlobal",
			property: "rely_month_installment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pace:jsGlobal:3",
			kind: "jsGlobal",
			property: "rely_shop_currency",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pace:jsGlobal:4",
			kind: "jsGlobal",
			property: "rely_shop_money_format",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
