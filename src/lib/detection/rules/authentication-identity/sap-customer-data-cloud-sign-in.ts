import type { TechnologyDefinition } from '../../types';

export const sapCustomerDataCloudSignInTechnologyDefinition = {
	id: "sap-customer-data-cloud-sign-in",
	name: "SAP Customer Data Cloud Sign-in",
	website: "https://www.sap.com/uk/acquired-brands/what-is-gigya.html",
	icon: "SAP.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "sap-customer-data-cloud-sign-in:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gigya\\.com\\/JS\\/gigya\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sap-customer-data-cloud-sign-in:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gigya\\.com\\/js\\/gigya\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
