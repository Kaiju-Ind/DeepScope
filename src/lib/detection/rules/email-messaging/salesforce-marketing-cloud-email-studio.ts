import type { TechnologyDefinition } from '../../types';

export const salesforceMarketingCloudEmailStudioTechnologyDefinition = {
	id: "salesforce-marketing-cloud-email-studio",
	name: "Salesforce Marketing Cloud Email Studio",
	website: "https://www.salesforce.com/products/marketing-cloud/email-marketing",
	description: "Salesforce Marketing Cloud Email Studio is a powerful tool that allows you to build and send personalised emails.",
	icon: "Salesforce.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "salesforce-marketing-cloud-email-studio:dom:0",
			kind: "dom",
			selector: "a[href*='.exacttarget.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-email-studio:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.exacttarget\\.com\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
