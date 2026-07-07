import type { TechnologyDefinition } from '../../types';

export const bookNPayTechnologyDefinition = {
	id: "book-n-pay",
	name: "Book N Pay",
	website: "https://booknpay.net",
	description: "Book N Pay is a platform for booking and paying for various services and activities.",
	icon: "BookNPay.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "book-n-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.booknpay\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
