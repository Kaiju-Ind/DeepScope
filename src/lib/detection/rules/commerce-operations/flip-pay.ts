import type { TechnologyDefinition } from '../../types';

export const flipPayTechnologyDefinition = {
	id: "flip-pay",
	name: "Flip-Pay",
	website: "https://www.flip-pay.com",
	description: "Flip-Pay is a platform that provides advanced content monetization solutions, offering end-to-end paywall services for publishers and digital businesses.",
	icon: "FlipPay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "flip-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.flip-pay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flip-pay:jsGlobal:1",
			kind: "jsGlobal",
			property: "flipPay.getCustomerAcessStatus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flip-pay:jsGlobal:2",
			kind: "jsGlobal",
			property: "flipPayConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
