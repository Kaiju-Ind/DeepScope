import type { TechnologyDefinition } from '../../types';

export const salesforceMarketingCloudAccountEngagementTechnologyDefinition = {
	id: "salesforce-marketing-cloud-account-engagement",
	name: "Salesforce Marketing Cloud Account Engagement",
	website: "https://www.salesforce.com/products/marketing-cloud/marketing-automation",
	description: "Salesforce Marketing Cloud Account Engagement (formerly known as Pardot) is an application specifically designed for B2B marketing automation.",
	icon: "Salesforce.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "salesforce-marketing-cloud-account-engagement:dom:0",
			kind: "dom",
			selector: "iframe[src*='.pardot.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:jsGlobal:1",
			kind: "jsGlobal",
			property: "piAId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:jsGlobal:2",
			kind: "jsGlobal",
			property: "piCId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:jsGlobal:3",
			kind: "jsGlobal",
			property: "piHostname",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:jsGlobal:4",
			kind: "jsGlobal",
			property: "piProtocol",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:jsGlobal:5",
			kind: "jsGlobal",
			property: "piTracker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-marketing-cloud-account-engagement:dns:6",
			kind: "dns",
			valuePattern: new RegExp("pardot", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
