import type { TechnologyDefinition } from '../../types';

export const pesapalTechnologyDefinition = {
	id: "pesapal",
	name: "Pesapal",
	website: "https://www.pesapal.com",
	description: "Pesapal is an online payment platform catering to various online businesses, including ecommerce, subscription services, online platforms, and marketplaces.",
	icon: "Pesapal.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pesapal:dom:0",
			kind: "dom",
			selector: "div#payment-options > a[href*='www.pesapal.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pesapal:jsGlobal:1",
			kind: "jsGlobal",
			property: "pesapalIframe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
