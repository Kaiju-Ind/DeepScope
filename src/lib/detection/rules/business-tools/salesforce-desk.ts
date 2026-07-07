import type { TechnologyDefinition } from '../../types';

export const salesforceDeskTechnologyDefinition = {
	id: "salesforce-desk",
	name: "Salesforce Desk",
	website: "https://www.salesforce.com/solutions/small-business-solutions/help-desk-software/",
	description: "Salesforce Desk(Desk.com) is software as a service (SaaS) tool on the help desk.",
	icon: "Salesforce.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesforce-desk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/s\\/sfsites\\/auraFW\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-desk:dom:1",
			kind: "dom",
			selector: "link[href*='/s/sfsites/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesforce-desk:scriptSrc:2",
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
