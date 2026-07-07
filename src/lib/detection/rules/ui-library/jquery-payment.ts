import type { TechnologyDefinition } from '../../types';

export const jqueryPaymentTechnologyDefinition = {
	id: "jquery-payment",
	name: "jQuery Payment",
	website: "https://plugins.jquery.com/payment",
	description: "jQuery Payment is a general-purpose library for building credit card forms, validating input fields, and formatting card numbers.",
	icon: "jQuery.svg",
	categories: [
		"ui-library",
		"commerce-operations",
	],
	rules: [
		{
			id: "jquery-payment:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery-payment\\/jquery\\.payment\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
