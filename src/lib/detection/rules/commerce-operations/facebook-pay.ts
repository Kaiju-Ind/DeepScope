import type { TechnologyDefinition } from '../../types';

export const facebookPayTechnologyDefinition = {
	id: "facebook-pay",
	name: "Facebook Pay",
	website: "https://pay.facebook.com/",
	description: "Facebook pay is a payment solution which can be used on any site or app outside Facebook ecosystem.",
	icon: "Facebook.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "facebook-pay:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-facebook_pay']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
