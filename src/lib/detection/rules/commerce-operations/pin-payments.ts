import type { TechnologyDefinition } from '../../types';

export const pinPaymentsTechnologyDefinition = {
	id: "pin-payments",
	name: "Pin Payments",
	website: "https://www.pinpayments.com/",
	description: "Pin Payments is an all-in-one online payment system. It offers merchants a simple JSON API, secure credit card storage, multi-currency capabilities, bank account compatibility, onsite payment processing and automatic fund transfer to specified bank accounts.",
	icon: "pinpayments.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pin-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.pinpayments\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
