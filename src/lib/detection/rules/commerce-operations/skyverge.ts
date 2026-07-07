import type { TechnologyDefinition } from '../../types';

export const skyvergeTechnologyDefinition = {
	id: "skyverge",
	name: "SkyVerge",
	website: "https://www.skyverge.com",
	description: "SkyVerge  is a company which develop extension tools for WooCommerce stores.",
	icon: "SkyVerge.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "skyverge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sv-wc-payment-gateway-payment-form\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "skyverge:jsGlobal:1",
			kind: "jsGlobal",
			property: "sv_wc_payment_gateway_payment_form_param",
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
	implies: [
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
