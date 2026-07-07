import type { TechnologyDefinition } from '../../types';

export const wepayTechnologyDefinition = {
	id: "wepay",
	name: "Wepay",
	website: "https://go.wepay.com",
	description: "Wepay is a provider of integrated payments processing solutions tailored for platforms, facilitating transaction management across diverse service offerings.",
	icon: "WePay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wepay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wepay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wepay:dom:1",
			kind: "dom",
			selector: "link[href*='.wepay.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wepay:jsGlobal:2",
			kind: "jsGlobal",
			property: "WePay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
