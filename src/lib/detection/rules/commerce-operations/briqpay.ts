import type { TechnologyDefinition } from '../../types';

export const briqpayTechnologyDefinition = {
	id: "briqpay",
	name: "Briqpay",
	website: "https://briqpay.com",
	description: "Briqpay is a payment optimization platform that streamlines business payment processes through its Payments Unleashed solution.",
	icon: "Briqpay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "briqpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.briqpay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "briqpay:jsGlobal:1",
			kind: "jsGlobal",
			property: "_briqpay.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
