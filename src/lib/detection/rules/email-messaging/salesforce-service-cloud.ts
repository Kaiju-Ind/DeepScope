import type { TechnologyDefinition } from '../../types';

export const salesforceServiceCloudTechnologyDefinition = {
	id: "salesforce-service-cloud",
	name: "Salesforce Service Cloud",
	website: "https://www.salesforce.com/au/products/service-cloud/",
	description: "Salesforce Service Cloud is a customer relationship management (CRM) platform for customer service and support.",
	icon: "Salesforce.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "salesforce-service-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service\\.force\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-service-cloud:jsGlobal:1",
			kind: "jsGlobal",
			property: "embedded_svc",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
	implies: [
		"salesforce",
	],
} as const satisfies TechnologyDefinition;
