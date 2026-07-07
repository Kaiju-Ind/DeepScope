import type { TechnologyDefinition } from '../../types';

export const amexExpressCheckoutTechnologyDefinition = {
	id: "amex-express-checkout",
	name: "Amex Express Checkout",
	website: "https://www.americanexpress.com/us/express-checkout/",
	description: "Amex Express Checkout is a service that simplifies the checkout experience by auto-filling necessary cardholder payment data into merchant checkout fields.",
	icon: "amex.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "amex-express-checkout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("aexp-static\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amex-express-checkout:dom:1",
			kind: "dom",
			selector: "img[alt*='We accept Amex']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
