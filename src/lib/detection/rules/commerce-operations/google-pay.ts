import type { TechnologyDefinition } from '../../types';

export const googlePayTechnologyDefinition = {
	id: "google-pay",
	name: "Google Pay",
	website: "https://pay.google.com",
	description: "Google Pay is a digital wallet platform and online payment system developed by Google to power in-app and tap-to-pay purchases on mobile devices, enabling users to make payments with Android phones, tablets or watches.",
	icon: "Google.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "google-pay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pay\\.google\\.com\\/([a-z/]+)\\/pay\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-pay:dom:1",
			kind: "dom",
			selector: "[aria-labelledby='pi-google_pay'], ul[data-shopify-buttoncontainer] li",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
