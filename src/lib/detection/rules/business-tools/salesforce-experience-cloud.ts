import type { TechnologyDefinition } from '../../types';

export const salesforceExperienceCloudTechnologyDefinition = {
	id: "salesforce-experience-cloud",
	name: "Salesforce Experience Cloud",
	website: "https://www.salesforce.com/ca/products/community-cloud/solutions/",
	description: "Salesforce Experience Cloud is a CRM-powered SaaS solution for creating external portals and communities connected to Salesforce data and workflows.",
	icon: "Salesforce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesforce-experience-cloud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/s\\/sfsites\\/auraFW\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-experience-cloud:dom:1",
			kind: "dom",
			selector: "link[href*='/s/sfsites/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesforce-experience-cloud:jsGlobal:2",
			kind: "jsGlobal",
			property: "lwcRuntimeFlags",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-experience-cloud:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/s\\/sfsites\\/aurafw\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
